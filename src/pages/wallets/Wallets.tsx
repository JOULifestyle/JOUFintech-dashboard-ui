import { useState } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { api } from "../../api/client";
import { useToastStore } from "../../stores/toastStore";
import { useUIStore } from "../../stores/uiStore";
import WalletTransferModal from "../../components/WalletTransferModal";

type Wallet = {
  id: string;
  name: string;
  balance: number;
  currency?: string;
};

export default function WalletsPage() {
  const queryClient = useQueryClient();
  const { addToast } = useToastStore();
  const { currency, exchangeRates } = useUIStore();
  const [modalOpen, setModalOpen] = useState(false);

  // Fetch wallets
  const { data: wallets = [], isLoading } = useQuery<Wallet[]>({
    queryKey: ["wallets"],
    queryFn: async () => {
      const res = await api.get("/wallets");
      return res.data;
    },
  });

  // Optimistic wallet transfer mutation
  const transferMutation = useMutation<
    any, // I am using this for now, once I have any specific thing to return, I'll type it
    Error, // error type
    { fromId: string; toId: string; amount: number }, // variables type
    { prev?: Wallet[] } // context type (for rollback)
  >({
    mutationFn: async ({ fromId, toId, amount }) => {
      const res = await api.post("/wallets/transfer", { fromId, toId, amount });
      return res.data;
    },
    onMutate: async (vars) => {
      await queryClient.cancelQueries({ queryKey: ["wallets"] });
      const prev = queryClient.getQueryData<Wallet[]>(["wallets"]);

      if (prev) {
        const updated = prev.map((w) =>
          w.id === vars.fromId
            ? { ...w, balance: w.balance - vars.amount }
            : w.id === vars.toId
            ? { ...w, balance: w.balance + vars.amount }
            : w
        );
        queryClient.setQueryData(["wallets"], updated);
      }

      return { prev };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) queryClient.setQueryData(["wallets"], ctx.prev);
      addToast({ message: "Transfer failed, rolled back.", type: "error" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wallets"] });
      addToast({ message: "Transfer successful!", type: "success" });
    },
  });

  if (isLoading)
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Wallets</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your financial accounts and balances</p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="px-6 py-3 bg-linear-to-r from-joublue to-joupurple text-white rounded-lg hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 font-medium"
        >
          <svg className="w-4 h-4 inline mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
          Transfer Funds
        </button>
      </div>

      {/* Wallet Grid */}
      {wallets.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-12 text-center">
          <div className="w-16 h-16 bg-linear-to-br from-joublue to-joupurple rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No wallets found</h3>
          <p className="text-gray-600 dark:text-gray-400">Create your first wallet to get started</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wallets.map((w) => (
            <div
              key={w.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-linear-to-br from-joublue to-joupurple rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  {w.currency || "USD"}
                </span>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                {w.name}
              </h3>

              <p className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: currency,
                  minimumFractionDigits: 2
                }).format(w.balance * (exchangeRates[currency] || 1))}
              </p>

              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
                Current Balance
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Transfer Modal */}
      {modalOpen && (
        <WalletTransferModal
          wallets={wallets}
          onClose={() => setModalOpen(false)}
          onTransfer={(fromId, toId, amount) =>
            transferMutation.mutate({ fromId, toId, amount })
          }
        />
      )}
    </div>
  );
}
