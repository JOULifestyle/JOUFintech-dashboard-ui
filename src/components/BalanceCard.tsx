type BalanceCardProps = {
  total: number;
  available: number;
  pending: number;
  currency?: string;
  exchangeRates?: Record<string, number>;
};

export default function BalanceCard({ total, available, pending, currency = 'USD', exchangeRates = { USD: 1 } }: BalanceCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="text-center md:text-left">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
            Total Balance
          </h3>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: currency,
              minimumFractionDigits: 2
            }).format(total * (exchangeRates[currency] || 1))}
          </p>
        </div>
        <div className="text-center md:text-left">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
            Available
          </h3>
          <p className="text-2xl font-semibold text-green-600 dark:text-green-400">
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: currency,
              minimumFractionDigits: 2
            }).format(available * (exchangeRates[currency] || 1))}
          </p>
        </div>
        <div className="text-center md:text-left">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
            Pending
          </h3>
          <p className="text-2xl font-semibold text-yellow-600 dark:text-yellow-400">
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: currency,
              minimumFractionDigits: 2
            }).format(pending * (exchangeRates[currency] || 1))}
          </p>
        </div>
      </div>
    </div>
  );
}
