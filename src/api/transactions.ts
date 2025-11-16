import { api } from "./client";

export type Transaction = {
  id: string;
  amount: number;
  date: string;
  category: string;
  type: "expense" | "income" | "transfer";
  walletId?: string;
  description?: string;
  status?: "pending" | "completed";
};

// Fetch transactions (with pagination)
export const fetchTransactions = async (page = 1): Promise<Transaction[]> => {
  const res = await api.get(`/transactions`, { params: { page } });
  return res.data;
};

// Create
export const createTransaction = async (tx: Omit<Transaction, "id">) => {
  const res = await api.post("/transactions", tx);
  return res.data;
};

// Update
export const updateTransaction = async (tx: Transaction) => {
  const res = await api.put(`/transactions/${tx.id}`, tx);
  return res.data;
};

// Delete
export const deleteTransaction = async (id: string) => {
  await api.delete(`/transactions/${id}`);
  return id;
};
