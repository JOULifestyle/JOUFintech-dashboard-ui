import { useState } from 'react';
import { motion } from 'framer-motion';
import { Dialog } from '@headlessui/react';
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  CheckCircleIcon,
  TagIcon
} from '@heroicons/react/24/outline';
import { useQuery } from "@tanstack/react-query";
import { api } from "../../api/client";
import { useToastStore } from "../../stores/toastStore";
import { useUIStore } from "../../stores/uiStore";
import SavingsGoalForm from "../../components/SavingsGoalForm";

export default function SavingsGoals() {
  const { addToast } = useToastStore();
  const { currency, exchangeRates } = useUIStore();
  const [showForm, setShowForm] = useState(false);
  const [editingGoal, setEditingGoal] = useState<any>(null);

  // Fetch savings goals
  const { data: savingsGoals = [], refetch } = useQuery({
    queryKey: ["savings-goals"],
    queryFn: async () => {
      const res = await api.get("/savings-goals");
      return Array.isArray(res.data) ? res.data : [];
    },
  });

  const handleAddGoal = () => {
    setEditingGoal(null);
    setShowForm(true);
  };

  const handleEditGoal = (goal: any) => {
    setEditingGoal(goal);
    setShowForm(true);
  };

  const handleDeleteGoal = async (goalId: string) => {
    try {
      await api.delete(`/savings-goals/${goalId}`);
      addToast({ message: 'Savings goal deleted successfully', type: 'success' });
      refetch();
    } catch {
      addToast({ message: 'Failed to delete savings goal', type: 'error' });
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingGoal(null);
    refetch();
  };

  const calculateProgress = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const formatCurrency = (amount: number) => {
    const convertedAmount = amount * (exchangeRates[currency] || 1);
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2
    }).format(convertedAmount);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Savings Goals</h1>
          <p className="text-gray-600 dark:text-gray-400">Track and manage your financial goals</p>
        </div>
        <button
          onClick={handleAddGoal}
          className="flex items-center gap-2 px-4 py-2 bg-joublue text-white rounded-lg hover:bg-joublue-600 transition-colors"
        >
          <PlusIcon className="h-5 w-5" />
          Add Goal
        </button>
      </div>

      {/* Goals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {savingsGoals.map((goal: any, index: number) => (
          <motion.div
            key={goal.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft border border-gray-100 dark:border-gray-700 p-6 hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  goal.isCompleted
                    ? 'bg-green-100 dark:bg-green-900/30'
                    : 'bg-joublue-100 dark:bg-joublue-900/30'
                }`}>
                  {goal.isCompleted ? (
                    <CheckCircleIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
                  ) : (
                    <TagIcon className="h-6 w-6 text-joublue-600 dark:text-joublue-400" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{goal.name}</h3>
                  <p className={`text-sm ${
                    goal.isCompleted
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-gray-600 dark:text-gray-400'
                  }`}>
                    {goal.isCompleted ? 'Completed' : 'In Progress'}
                  </p>
                </div>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => handleEditGoal(goal)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <PencilIcon className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                </button>
                <button
                  onClick={() => handleDeleteGoal(goal.id)}
                  className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                >
                  <TrashIcon className="h-4 w-4 text-red-600 dark:text-red-400" />
                </button>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600 dark:text-gray-400">Progress</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {calculateProgress(goal.current, goal.target).toFixed(0)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    goal.isCompleted
                      ? 'bg-green-500'
                      : 'bg-joublue'
                  }`}
                  style={{ width: `${calculateProgress(goal.current, goal.target)}%` }}
                />
              </div>
            </div>

            {/* Amounts */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Current</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {formatCurrency(goal.current)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Target</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {formatCurrency(goal.target)}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-100 dark:border-gray-700">
                <span className="text-sm text-gray-600 dark:text-gray-400">Remaining</span>
                <span className={`font-medium ${
                  goal.isCompleted
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-gray-900 dark:text-white'
                }`}>
                  {formatCurrency(Math.max(0, goal.target - goal.current))}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {savingsGoals.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <TagIcon className="h-16 w-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No savings goals yet</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">Create your first savings goal to start tracking your progress</p>
          <button
            onClick={handleAddGoal}
            className="px-6 py-3 bg-joublue text-white rounded-lg hover:bg-joublue-600 transition-colors font-medium"
          >
            Create Your First Goal
          </button>
        </motion.div>
      )}

      {/* Add/Edit Form Modal */}
      <Dialog open={showForm} onClose={() => setShowForm(false)} className="fixed z-50 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" aria-hidden="true" />

          <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-2xl text-left shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full relative z-10">
            <div className="px-6 py-6">
              <div className="flex items-center justify-between mb-6">
                <Dialog.Title className="text-xl font-bold text-gray-900 dark:text-white">
                  {editingGoal ? 'Edit Savings Goal' : 'Add Savings Goal'}
                </Dialog.Title>
                <button
                  onClick={() => setShowForm(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <SavingsGoalForm goal={editingGoal} onClose={handleFormClose} />
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}