import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreateTransaction } from "../hooks/useTransactions";
import { useQuery } from "@tanstack/react-query";
import { api } from "../api/client";
import { useUIStore } from "../stores/uiStore";
import { getCurrencySymbol } from "../features/utils/chartUtils";

const TransactionSchema = z.object({
  amount: z.number().min(0.01, "Amount must be greater than 0"),
  category: z.string().min(1, "Category is required"),
  type: z.enum(["income", "expense"]),
  walletId: z.string().optional(),
  description: z.string().optional(),
  date: z.string().min(1, "Date is required"),
});

type FormData = z.infer<typeof TransactionSchema>;

interface TransactionFormProps {
  onClose?: () => void;
}

export default function TransactionForm({ onClose }: TransactionFormProps) {
  const { mutate } = useCreateTransaction();
  const { currency, exchangeRates } = useUIStore();

  // Fetch wallets for selection
  const { data: wallets = [], isLoading: walletsLoading } = useQuery({
    queryKey: ["wallets"],
    queryFn: async () => {
      const res = await api.get("/wallets");
      return res.data;
    },
  });

  const { register, handleSubmit, reset, watch, formState: { errors, isValid } } = useForm<FormData>({
    resolver: zodResolver(TransactionSchema),
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
      type: "expense",
      walletId: wallets.length > 0 ? wallets[0].id : "main", // Default to first wallet or "main"
    },
  });

  const selectedType = watch("type");

  const onSubmit = (data: FormData) => {
    // Convert amount from user's currency to USD for storage
    const usdAmount = data.amount / (exchangeRates[currency] || 1);

    mutate({
      ...data,
      amount: usdAmount,
      date: new Date(data.date).toISOString(),
    });
    reset();
    onClose?.();
  };

  const categories = {
    expense: ["Food", "Transport", "Bills", "Shopping", "Entertainment", "Healthcare", "Education", "Other"],
    income: ["Salary", "Freelance", "Business", "Investment", "Gift", "Other"],
  };

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, string> = {
      Food: "🍔",
      Transport: "🚗",
      Bills: "💡",
      Shopping: "🛍️",
      Entertainment: "🎬",
      Healthcare: "🏥",
      Education: "📚",
      Salary: "💼",
      Freelance: "💻",
      Business: "🏢",
      Investment: "📈",
      Gift: "🎁",
      Transfer: "🔄",
      Other: "📝",
    };
    return icons[category] || "📝";
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Type Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Transaction Type
          </label>
          <select
            {...register("type")}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-joublue focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="expense">💸 Expense</option>
            <option value="income">💰 Income</option>
          </select>
          {errors.type && <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>}
        </div>

        {/* Wallet Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Wallet
          </label>
          <select
            {...register("walletId")}
            disabled={walletsLoading}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-joublue focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:opacity-50"
          >
            <option value="">
              {walletsLoading ? "Loading wallets..." : "Select a wallet"}
            </option>
            {wallets.map((wallet: any) => (
              <option key={wallet.id} value={wallet.id}>
                {wallet.name} ({getCurrencySymbol(currency)}{(wallet.balance * (exchangeRates[currency] || 1)).toLocaleString()})
              </option>
            ))}
          </select>
          {errors.walletId && <p className="mt-1 text-sm text-red-600">{errors.walletId.message}</p>}
        </div>

        {/* Amount */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Amount ({getCurrencySymbol(currency)})
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 dark:text-gray-400 text-sm">{getCurrencySymbol(currency)}</span>
            </div>
            <input
              type="number"
              step="0.01"
              placeholder="0.00"
              {...register("amount", { valueAsNumber: true })}
              className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-joublue focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>
          {errors.amount && <p className="mt-1 text-sm text-red-600">{errors.amount.message}</p>}
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Category
          </label>
          <select
            {...register("category")}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-joublue focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="">Select a category</option>
            {categories[selectedType as keyof typeof categories]?.map((category) => (
              <option key={category} value={category}>
                {getCategoryIcon(category)} {category}
              </option>
            ))}
          </select>
          {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>}
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Date
          </label>
          <input
            type="date"
            {...register("date")}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-joublue focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
          {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Description (Optional)
          </label>
          <textarea
            placeholder="Add a note about this transaction..."
            {...register("description")}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-joublue focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none"
          />
        </div>

        {/* Submit Buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
          <button
            type="button"
            onClick={() => onClose?.()}
            className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!isValid}
            className="px-6 py-2 bg-linear-to-r from-joublue to-joupurple text-white rounded-lg hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            Add Transaction
          </button>
        </div>
      </form>
    </div>
  );
}
