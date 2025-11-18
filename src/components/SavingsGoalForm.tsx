import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { api } from '../api/client';
import { useToastStore } from '../stores/toastStore';
import { useUIStore } from '../stores/uiStore';
import { getCurrencySymbol } from '../features/utils/chartUtils';

const savingsGoalSchema = z.object({
  name: z.string().min(1, 'Goal name is required'),
  target: z.number().min(1, 'Target amount must be greater than 0'),
  current: z.number().min(0, 'Current amount cannot be negative').optional(),
});

type SavingsGoalFormData = z.infer<typeof savingsGoalSchema>;

interface Props {
  goal?: any;
  onClose: () => void;
}

export default function SavingsGoalForm({ goal, onClose }: Props) {
  const { addToast } = useToastStore();
  const { currency, exchangeRates } = useUIStore();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SavingsGoalFormData>({
    resolver: zodResolver(savingsGoalSchema),
    defaultValues: {
      name: goal?.name || '',
      target: goal ? goal.target * (exchangeRates[currency] || 1) : 0,
      current: goal ? goal.current * (exchangeRates[currency] || 1) : 0,
    },
  });

  const onSubmit = async (data: SavingsGoalFormData) => {
    setIsLoading(true);
    try {
      // Convert amounts from user's currency back to USD for storage
      const usdData = {
        ...data,
        target: data.target / (exchangeRates[currency] || 1),
        current: data.current ? data.current / (exchangeRates[currency] || 1) : 0,
      };

      if (goal) {
        // Update existing goal
        await api.put(`/savings-goals/${goal.id}`, usdData);
        addToast({ message: 'Savings goal updated successfully', type: 'success' });
      } else {
        // Create new goal
        await api.post('/savings-goals', usdData);
        addToast({ message: 'Savings goal created successfully', type: 'success' });
      }
      onClose();
    } catch (error) {
      addToast({ message: 'Failed to save savings goal', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Goal Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Goal Name
        </label>
        <input
          {...register('name')}
          type="text"
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-joublue focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          placeholder="e.g., Emergency Fund, Vacation, New Car"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name.message}</p>
        )}
      </div>

      {/* Target Amount */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Target Amount ({getCurrencySymbol(currency)})
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 dark:text-gray-400 text-sm">{getCurrencySymbol(currency)}</span>
          </div>
          <input
            {...register('target', { valueAsNumber: true })}
            type="number"
            step="0.01"
            min="0"
            className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-joublue focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            placeholder="0.00"
          />
        </div>
        {errors.target && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.target.message}</p>
        )}
      </div>

      {/* Current Amount */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Current Amount ({getCurrencySymbol(currency)}) - Optional
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 dark:text-gray-400 text-sm">{getCurrencySymbol(currency)}</span>
          </div>
          <input
            {...register('current', { valueAsNumber: true })}
            type="number"
            step="0.01"
            min="0"
            className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-joublue focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            placeholder="0.00"
          />
        </div>
        {errors.current && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.current.message}</p>
        )}
      </div>

      {/* Form Actions */}
      <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors font-medium"
          disabled={isLoading}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-joublue text-white rounded-lg hover:bg-joublue-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? 'Saving...' : goal ? 'Update Goal' : 'Create Goal'}
        </button>
      </div>
    </form>
  );
}