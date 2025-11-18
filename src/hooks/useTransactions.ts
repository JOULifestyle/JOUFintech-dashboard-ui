import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Transaction } from "../api/transactions";
import {
  fetchTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from "../api/transactions";

// Fetch transactions
export function useTransactions(page: number) {
  return useQuery<Transaction[]>({
    queryKey: ["transactions", { page }],
    queryFn: () => fetchTransactions(page),
  });
}

// Create transaction
export function useCreateTransaction() {
  const queryClient = useQueryClient();

  return useMutation<Transaction, Error, Omit<Transaction, "id">>({
    mutationFn: createTransaction,
    onMutate: async (newTx) => {
      await queryClient.cancelQueries({ queryKey: ["transactions"] });
      const previous = queryClient.getQueryData<Transaction[]>(["transactions"]);

      queryClient.setQueryData<Transaction[]>(["transactions"], (old = []) => [
        ...old,
        { ...newTx, id: Date.now().toString() },
      ]);

      return { previous };
    },
    onError: (_err, _newTx, context) => {
      if (context && typeof context === "object" && "previous" in context) {
        queryClient.setQueryData(["transactions"], (context as { previous: Transaction[] }).previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["wallets"] });
      queryClient.invalidateQueries({ queryKey: ["balance"] });
    },
  });
}

// Update transaction
export function useUpdateTransaction() {
  const queryClient = useQueryClient();

  return useMutation<Transaction, Error, Transaction>({
    mutationFn: updateTransaction,
    onMutate: async (updated) => {
      await queryClient.cancelQueries({ queryKey: ["transactions"] });
      const previous = queryClient.getQueryData<Transaction[]>(["transactions"]);

      queryClient.setQueryData<Transaction[]>(["transactions"], (old = []) =>
        old.map((t) => (t.id === updated.id ? updated : t))
      );

      return { previous };
    },
    onError: (_err, _updated, context) => {
      if (context && typeof context === "object" && "previous" in context) {
        queryClient.setQueryData(["transactions"], (context as { previous: Transaction[] }).previous);
      }
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["transactions"] }),
  });
}

// Delete transaction
export function useDeleteTransaction() {
  const queryClient = useQueryClient();

  return useMutation<string, Error, string>({
    mutationFn: deleteTransaction,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["transactions"] });
      const previous = queryClient.getQueryData<Transaction[]>(["transactions"]);

      queryClient.setQueryData<Transaction[]>(["transactions"], (old = []) =>
        old.filter((t) => t.id !== id)
      );

      return { previous };
    },
    onError: (_err, _id, context) => {
      if (context && typeof context === "object" && "previous" in context) {
        queryClient.setQueryData(["transactions"], (context as { previous: Transaction[] }).previous);
      }
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["transactions"] }),
  });
}
