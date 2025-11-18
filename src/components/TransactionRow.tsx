import type { Transaction } from "../api/transactions";
import { useUIStore } from "../stores/uiStore";
import { getCurrencySymbol } from "../features/utils/chartUtils";

export default function TransactionRow({ tx }: { tx: Transaction }) {
  const { currency } = useUIStore();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatAmount = (amount: number, type: string) => {
    const formatted = Math.abs(amount).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    const symbol = getCurrencySymbol(currency);
    return type === 'income' ? `+${symbol}${formatted}` : `-${symbol}${formatted}`;
  };

  return (
    <tr className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
        {formatDate(tx.date)}
      </td>
      <td className="px-4 py-3">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
          {tx.category}
        </span>
      </td>
      <td className={`px-4 py-3 text-sm font-semibold ${
        tx.type === 'income'
          ? 'text-green-600 dark:text-green-400'
          : 'text-red-600 dark:text-red-400'
      }`}>
        {formatAmount(tx.amount, tx.type)}
      </td>
      <td className="px-4 py-3">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
          tx.type === 'income'
            ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
            : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
        }`}>
          {tx.type}
        </span>
      </td>
    </tr>
  );
}
