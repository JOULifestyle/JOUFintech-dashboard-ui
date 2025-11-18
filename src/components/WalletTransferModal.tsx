import { useState } from "react";
import { motion } from "framer-motion";
import { useUIStore } from "../stores/uiStore";
import { getCurrencySymbol } from "../features/utils/chartUtils";

type Wallet = { id: string; name: string; balance: number; currency?: string };

type Props = {
  wallets: Wallet[];
  onClose: () => void;
  onTransfer: (fromId: string, toId: string, amount: number) => void;
};

export default function WalletTransferModal({
  wallets,
  onClose,
  onTransfer,
}: Props) {
  const { currency, exchangeRates } = useUIStore();
  const [fromId, setFromId] = useState("");
  const [toId, setToId] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!fromId || !toId || amount <= 0) {
      setError("Please fill in all fields correctly.");
      return;
    }
    if (fromId === toId) {
      setError("Source and destination wallets must differ.");
      return;
    }
    const fromWallet = wallets.find((w) => w.id === fromId);
    // Convert the entered amount from user's currency back to USD for validation and transfer
    const usdAmount = amount / (exchangeRates[currency] || 1);
    if (fromWallet && usdAmount > fromWallet.balance) {
      setError("Insufficient balance in source wallet.");
      return;
    }

    onTransfer(fromId, toId, usdAmount);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
      >
        {/* Header */}
        <div className="bg-linear-to-r from-joublue to-joupurple p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Transfer Funds</h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="p-6">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                From Wallet
              </label>
              <select
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-joublue focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                value={fromId}
                onChange={(e) => setFromId(e.target.value)}
              >
                <option value="">Select source wallet</option>
                {wallets.map((w) => (
                  <option key={w.id} value={w.id}>
                    {w.name} - {getCurrencySymbol(currency)}{(w.balance * (exchangeRates[currency] || 1)).toLocaleString()} available
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center justify-center">
              <div className="w-8 h-8 bg-linear-to-r from-joublue to-joupurple rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                To Wallet
              </label>
              <select
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-joublue focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                value={toId}
                onChange={(e) => setToId(e.target.value)}
              >
                <option value="">Select destination wallet</option>
                {wallets.map((w) => (
                  <option key={w.id} value={w.id}>
                    {w.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Transfer Amount ({getCurrencySymbol(currency)})
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 dark:text-gray-400 text-sm">{getCurrencySymbol(currency)}</span>
                </div>
                <input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-joublue focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  value={amount || ''}
                  onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                />
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-red-600 dark:text-red-400 text-sm flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {error}
                </p>
              </div>
            )}

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-linear-to-r from-joublue to-joupurple text-white rounded-lg hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!fromId || !toId || amount <= 0}
              >
                Transfer Funds
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
