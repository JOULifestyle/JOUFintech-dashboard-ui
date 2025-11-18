import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Dialog } from '@headlessui/react';
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../api/client";
import { useUIStore } from "../../stores/uiStore";
import { useToastStore } from "../../stores/toastStore";
import { getCurrencySymbol } from "../../features/utils/chartUtils";
import PieChartCard from "../../components/charts/PieChartCard";

interface Investment {
  id: string;
  assetType: 'stocks' | 'crypto' | 'real-estate' | 'mutual-fund' | 'fixed-income' | 'custom';
  assetName: string;
  buyPrice: number;
  currentPrice: number;
  units: number;
  purchaseDate: string;
  category?: string;
}

interface InvestmentFormData {
  assetType: Investment['assetType'];
  assetName: string;
  buyPrice: number;
  currentPrice: number;
  units: number;
  purchaseDate: string;
  category?: string;
}

export default function InvestmentsPage() {
  const { currency, exchangeRates } = useUIStore();
  const { addToast } = useToastStore();
  const queryClient = useQueryClient();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingInvestment, setEditingInvestment] = useState<Investment | null>(null);

  // Fetch investments
  const { data: investments = [], isLoading, error } = useQuery<Investment[]>({
    queryKey: ["investments"],
    queryFn: async () => {
      const res = await api.get("/investments");
      return res.data;
    },
  });

  // Add investment mutation
  const addInvestmentMutation = useMutation({
    mutationFn: (data: InvestmentFormData) => api.post("/investments", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["investments"] });
      setShowAddForm(false);
      addToast({ message: "Investment added successfully", type: "success" });
    },
    onError: () => {
      addToast({ message: "Failed to add investment", type: "error" });
    },
  });

  // Update investment mutation
  const updateInvestmentMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<InvestmentFormData> }) =>
      api.put(`/investments/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["investments"] });
      setEditingInvestment(null);
      addToast({ message: "Investment updated successfully", type: "success" });
    },
    onError: () => {
      addToast({ message: "Failed to update investment", type: "error" });
    },
  });

  // Delete investment mutation
  const deleteInvestmentMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/investments/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["investments"] });
      addToast({ message: "Investment deleted successfully", type: "success" });
    },
    onError: () => {
      addToast({ message: "Failed to delete investment", type: "error" });
    },
  });

  const formatCurrency = (amount: number) => {
    const convertedAmount = amount * (exchangeRates[currency] || 1);
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2
    }).format(convertedAmount);
  };

  // Calculate portfolio metrics
  const portfolioMetrics = investments.reduce((acc, inv) => {
    const marketValue = inv.units * inv.currentPrice;
    const totalCost = inv.units * inv.buyPrice;
    const profit = marketValue - totalCost;

    return {
      totalValue: acc.totalValue + marketValue,
      totalCost: acc.totalCost + totalCost,
      totalProfit: acc.totalProfit + profit,
    };
  }, { totalValue: 0, totalCost: 0, totalProfit: 0 });

  const totalReturnPercent = portfolioMetrics.totalCost > 0
    ? (portfolioMetrics.totalProfit / portfolioMetrics.totalCost) * 100
    : 0;

  // Prepare data for pie chart
  const assetTypeData = investments.reduce((acc, inv) => {
    const value = inv.units * inv.currentPrice;
    acc[inv.assetType] = (acc[inv.assetType] || 0) + value;
    return acc;
  }, {} as Record<string, number>);

  const pieData = Object.entries(assetTypeData).map(([type, value]) => ({
    name: type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' '),
    value,
    color: getAssetTypeColor(type as Investment['assetType']),
  }));

  function getAssetTypeColor(type: Investment['assetType']): string {
    const colors = {
      stocks: '#10B981',
      crypto: '#F59E0B',
      'real-estate': '#8B5CF6',
      'mutual-fund': '#3B82F6',
      'fixed-income': '#EF4444',
      custom: '#6B7280',
    };
    return colors[type] || '#6B7280';
  }

  function getAssetTypeIcon(type: Investment['assetType']): string {
    const icons = {
      stocks: '📈',
      crypto: '₿',
      'real-estate': '🏠',
      'mutual-fund': '📊',
      'fixed-income': '💰',
      custom: '📦',
    };
    return icons[type] || '📦';
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Investment Portfolio</h1>
          <p className="text-gray-600 dark:text-gray-400">Track and manage your investment assets</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-linear-to-r from-joublue to-joupurple text-white rounded-lg hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 font-medium"
        >
          <PlusIcon className="w-4 h-4" />
          Add Investment
        </button>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-red-600 dark:text-red-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <div>
              <h3 className="text-sm font-medium text-red-800 dark:text-red-200">Error loading investments</h3>
              <p className="text-sm text-red-600 dark:text-red-400 mt-1">{error.message}</p>
            </div>
          </div>
        </div>
      )}

      {/* Portfolio Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Portfolio Value</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatCurrency(portfolioMetrics.totalValue)}
              </p>
            </div>
            <ChartBarIcon className="h-8 w-8 text-blue-500" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Profit/Loss</p>
              <p className={`text-2xl font-bold ${portfolioMetrics.totalProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {portfolioMetrics.totalProfit >= 0 ? '+' : ''}{formatCurrency(portfolioMetrics.totalProfit)}
              </p>
              <p className={`text-sm ${portfolioMetrics.totalProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {totalReturnPercent >= 0 ? '+' : ''}{totalReturnPercent.toFixed(2)}%
              </p>
            </div>
            {portfolioMetrics.totalProfit >= 0 ? (
              <ArrowTrendingUpIcon className="h-8 w-8 text-green-500" />
            ) : (
              <ArrowTrendingDownIcon className="h-8 w-8 text-red-500" />
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Assets</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {investments.length}
              </p>
            </div>
            <CurrencyDollarIcon className="h-8 w-8 text-purple-500" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Best Performer</p>
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                {investments.length > 0 ? investments.reduce((best, inv) => {
                  const bestReturn = (best.units * best.currentPrice - best.units * best.buyPrice) / (best.units * best.buyPrice);
                  const currentReturn = (inv.units * inv.currentPrice - inv.units * inv.buyPrice) / (inv.units * inv.buyPrice);
                  return currentReturn > bestReturn ? inv : best;
                }).assetName : 'N/A'}
              </p>
            </div>
            <ArrowTrendingUpIcon className="h-8 w-8 text-green-500" />
          </div>
        </motion.div>
      </div>

      {/* Charts and Assets Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Portfolio Breakdown Chart */}
        <div className="lg:col-span-1">
          <PieChartCard
            data={pieData}
            title="Portfolio Breakdown"
            currency={currency}
            exchangeRates={exchangeRates}
          />
        </div>

        {/* Investments List */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Your Investments</h3>
            </div>

            {isLoading ? (
              <div className="p-6 text-center text-gray-500">Loading investments...</div>
            ) : investments.length === 0 ? (
              <div className="p-12 text-center">
                <ChartBarIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No investments yet</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">Start building your portfolio by adding your first investment.</p>
                <button
                  onClick={() => setShowAddForm(true)}
                  className="px-4 py-2 bg-joublue text-white rounded-lg hover:bg-joublue-600 transition-colors"
                >
                  Add Your First Investment
                </button>
              </div>
            ) : (
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {investments.map((investment) => {
                  const marketValue = investment.units * investment.currentPrice;
                  const totalCost = investment.units * investment.buyPrice;
                  const profit = marketValue - totalCost;
                  const profitPercent = totalCost > 0 ? (profit / totalCost) * 100 : 0;

                  return (
                    <div key={investment.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="text-2xl">{getAssetTypeIcon(investment.assetType)}</div>
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white">{investment.assetName}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {investment.assetType.charAt(0).toUpperCase() + investment.assetType.slice(1).replace('-', ' ')} • {investment.units} units
                            </p>
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="font-semibold text-gray-900 dark:text-white">{formatCurrency(marketValue)}</p>
                          <p className={`text-sm ${profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {profit >= 0 ? '+' : ''}{formatCurrency(profit)} ({profitPercent >= 0 ? '+' : ''}{profitPercent.toFixed(2)}%)
                          </p>
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => setEditingInvestment(investment)}
                            className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                          >
                            <PencilIcon className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm('Delete this investment?')) {
                                deleteInvestmentMutation.mutate(investment.id);
                              }
                            }}
                            className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                          >
                            <TrashIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add/Edit Investment Modal */}
      <InvestmentFormModal
        isOpen={showAddForm || !!editingInvestment}
        onClose={() => {
          setShowAddForm(false);
          setEditingInvestment(null);
        }}
        investment={editingInvestment}
        currency={currency}
        exchangeRates={exchangeRates}
        onSubmit={(data) => {
          if (editingInvestment) {
            updateInvestmentMutation.mutate({ id: editingInvestment.id, data });
          } else {
            addInvestmentMutation.mutate(data);
          }
        }}
      />
    </div>
  );
}

// Investment Form Modal Component
interface InvestmentFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  investment?: Investment | null;
  currency: string;
  exchangeRates: Record<string, number>;
  onSubmit: (data: InvestmentFormData) => void;
}

function InvestmentFormModal({ isOpen, onClose, investment, currency, exchangeRates, onSubmit }: InvestmentFormModalProps) {
  const [formData, setFormData] = useState<InvestmentFormData>({
    assetType: 'stocks',
    assetName: '',
    buyPrice: 0,
    currentPrice: 0,
    units: 0,
    purchaseDate: new Date().toISOString().split('T')[0],
    category: '',
  });

  React.useEffect(() => {
    if (investment) {
      setFormData({
        assetType: investment.assetType,
        assetName: investment.assetName,
        buyPrice: investment.buyPrice * (exchangeRates[currency] || 1),
        currentPrice: investment.currentPrice * (exchangeRates[currency] || 1),
        units: investment.units,
        purchaseDate: investment.purchaseDate.split('T')[0],
        category: investment.category || '',
      });
    } else {
      setFormData({
        assetType: 'stocks',
        assetName: '',
        buyPrice: 0,
        currentPrice: 0,
        units: 0,
        purchaseDate: new Date().toISOString().split('T')[0],
        category: '',
      });
    }
  }, [investment, isOpen, exchangeRates, currency]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Convert prices from user's currency back to USD for storage
    const usdData = {
      ...formData,
      buyPrice: formData.buyPrice / (exchangeRates[currency] || 1),
      currentPrice: formData.currentPrice / (exchangeRates[currency] || 1),
    };
    onSubmit(usdData);
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" aria-hidden="true" />

        <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-2xl text-left shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full relative z-10">
          <div className="px-6 py-6">
            <div className="flex items-center justify-between mb-6">
              <Dialog.Title className="text-xl font-bold text-gray-900 dark:text-white">
                {investment ? 'Edit Investment' : 'Add New Investment'}
              </Dialog.Title>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Asset Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Asset Type
                </label>
                <select
                  value={formData.assetType}
                  onChange={(e) => setFormData({ ...formData, assetType: e.target.value as Investment['assetType'] })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-joublue focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="stocks">📈 Stocks</option>
                  <option value="crypto">₿ Crypto</option>
                  <option value="real-estate">🏠 Real Estate</option>
                  <option value="mutual-fund">📊 Mutual Fund / ETF</option>
                  <option value="fixed-income">💰 Fixed Income</option>
                  <option value="custom">📦 Custom Asset</option>
                </select>
              </div>

              {/* Asset Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Asset Name
                </label>
                <input
                  type="text"
                  value={formData.assetName}
                  onChange={(e) => setFormData({ ...formData, assetName: e.target.value })}
                  placeholder="e.g., Tesla, Bitcoin, Vanguard S&P 500"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-joublue focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  required
                />
              </div>

              {/* Buy Price & Current Price */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Buy Price ({getCurrencySymbol(currency)})
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 dark:text-gray-400 text-sm">{getCurrencySymbol(currency)}</span>
                    </div>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.buyPrice}
                      onChange={(e) => setFormData({ ...formData, buyPrice: parseFloat(e.target.value) || 0 })}
                      className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-joublue focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Current Price ({getCurrencySymbol(currency)})
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 dark:text-gray-400 text-sm">{getCurrencySymbol(currency)}</span>
                    </div>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.currentPrice}
                      onChange={(e) => setFormData({ ...formData, currentPrice: parseFloat(e.target.value) || 0 })}
                      className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-joublue focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Units & Purchase Date */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Units Owned
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.units}
                    onChange={(e) => setFormData({ ...formData, units: parseFloat(e.target.value) || 0 })}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-joublue focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Purchase Date
                  </label>
                  <input
                    type="date"
                    value={formData.purchaseDate}
                    onChange={(e) => setFormData({ ...formData, purchaseDate: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-joublue focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    required
                  />
                </div>
              </div>

              {/* Category (Optional) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category (Optional)
                </label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="e.g., Tech, Energy, Crypto"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-joublue focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-linear-to-r from-joublue to-joupurple text-white rounded-lg hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 font-medium"
                >
                  {investment ? 'Update Investment' : 'Add Investment'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Dialog>
  );
}