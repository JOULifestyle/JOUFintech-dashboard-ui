import { http, HttpResponse } from "msw";
import type { Transaction } from "../api/transactions";

// --------------------------
// Fake In-Memory Databases
// --------------------------

let transactions: Transaction[] = Array.from({ length: 25 }, (_, i) => ({
  id: (i + 1).toString(),
  amount: Math.floor(Math.random() * 1000),
  date: new Date(Date.now() - i * 86400000).toISOString(), // past i days
  category: ["Groceries", "Bills", "Savings", "Investment"][i % 4],
  type: i % 2 === 0 ? "expense" : "income",
  walletId: "main",
  description: `Transaction ${i + 1}`,
}));

let wallets = [
  { id: "main", name: "Main Account", balance: 5000 },
  { id: "savings", name: "Savings", balance: 2000 },
  { id: "crypto", name: "Crypto", balance: 1000 },
];

let savingsGoals = [
  { id: "1", name: "Emergency Fund", target: 10000, current: 7500, isCompleted: false },
  { id: "2", name: "Vacation", target: 3000, current: 3000, isCompleted: true },
  { id: "3", name: "New Car", target: 20000, current: 12000, isCompleted: false },
];

let investments = [
  { id: "1", name: "Tech Stocks", totalValue: 15000, return: 12.5 },
  { id: "2", name: "Bonds", totalValue: 8000, return: 5.2 },
  { id: "3", name: "Crypto", totalValue: 5000, return: -8.3 },
];

let notifications = [
  {
    id: "1",
    title: "Welcome to JOU Finance!",
    message: "Thanks for joining us. Start by adding your first transaction to track your finances.",
    type: "info" as const,
    isRead: false,
    createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
  },
  {
    id: "2",
    title: "Savings Goal Progress",
    message: "You're 75% towards your Emergency Fund goal! Keep up the great work.",
    type: "success" as const,
    isRead: false,
    createdAt: new Date(Date.now() - 43200000).toISOString(), // 12 hours ago
  },
  {
    id: "3",
    title: "High Spending Alert",
    message: "Your grocery spending this month is 20% higher than last month. Consider reviewing your budget.",
    type: "warning" as const,
    isRead: true,
    createdAt: new Date(Date.now() - 21600000).toISOString(), // 6 hours ago
  },
  {
    id: "4",
    title: "Investment Update",
    message: "Your Tech Stocks portfolio has gained 2.5% in the last week.",
    type: "info" as const,
    isRead: false,
    createdAt: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
  },
];

// --------------------------
// Handlers
// --------------------------

export const handlers = [
   // ---------- Auth ----------
   http.post("/api/auth/signin", async ({ request }: { request: Request }) => {
     const { email, password } = (await request.json()) as { email: string; password: string };

     // Mock user credentials
     const mockUser = {
       email: "john.doe@example.com",
       password: "password123",
       displayName: "John Doe",
       role: "user"
     };

     if (email === mockUser.email && password === mockUser.password) {
       return HttpResponse.json({
         user: {
           email: mockUser.email,
           displayName: mockUser.displayName,
           role: mockUser.role
         },
         token: "mock-token",
       });
     }

     return HttpResponse.json({ error: "Invalid credentials" }, { status: 401 });
   }),

   http.post("/api/auth/signup", async ({ request }: { request: Request }) => {
     const { email } = (await request.json()) as { email: string };
     return HttpResponse.json({ user: { email, role: "user" }, token: "mock-token" }, { status: 201 });
   }),

   // ---------- Transactions ----------
   http.get("/api/transactions", ({ request }: { request: Request }) => {
     console.log("GET /api/transactions request:", { url: request.url });
     const url = new URL(request.url);
     const page = url.searchParams.get("page");

     if (page) {
       // Paginated request
       const pageNum = Number(page);
       const perPage = 10;
       const start = (pageNum - 1) * perPage;
       const end = start + perPage;
       return HttpResponse.json(transactions.slice(start, end));
     } else {
       // Return all transactions for charts/insights
       return HttpResponse.json(transactions);
     }
   }),

   http.post("/api/transactions", async ({ request }: { request: Request }) => {
     const tx = (await request.json()) as Transaction;
     console.log("POST /api/transactions request:", tx);
     const newTx = { ...tx, id: (transactions.length + 1).toString() };
     transactions = [newTx, ...transactions];
     return HttpResponse.json(newTx, { status: 201 });
   }),

   http.put("/api/transactions/:id", async ({ request, params }) => {
     const { id } = params as { id: string };
     console.log("PUT /api/transactions/:id request:", { id, url: request.url });
     const updatedTx = (await request.json()) as Partial<Transaction>;
     const index = transactions.findIndex(t => t.id === id);
     if (index === -1) {
       return HttpResponse.json({ error: "Transaction not found" }, { status: 404 });
     }
     transactions[index] = { ...transactions[index], ...updatedTx };
     return HttpResponse.json(transactions[index]);
   }),

   http.delete("/api/transactions/:id", ({ params }) => {
     const { id } = params as { id: string };
     console.log("DELETE /api/transactions/:id request:", { id });
     const index = transactions.findIndex(t => t.id === id);
     if (index === -1) {
       return HttpResponse.json({ error: "Transaction not found" }, { status: 404 });
     }
     transactions.splice(index, 1);
     return HttpResponse.json({ success: true });
   }),

   // ---------- Wallets ----------
   http.get("/api/wallets", () => {
     return HttpResponse.json(wallets);
   }),

   // ✅ Wallet Transfer API
   http.post("/api/wallets/transfer", async ({ request }: { request: Request }) => {
     console.log("Transfer request received:", request.body);
     const body = (await request.json()) as { fromId: string; toId: string; amount: number };
     const { fromId, toId, amount } = body;
     console.log("Parsed data:", { fromId, toId, amount });

     const fromWallet = wallets.find((w) => w.id === fromId);
     const toWallet = wallets.find((w) => w.id === toId);
     console.log("Wallets found:", { fromWallet: !!fromWallet, toWallet: !!toWallet });

     if (!fromWallet || !toWallet) {
       console.log("Invalid wallets error");
       return HttpResponse.json({ error: "Invalid wallet(s)" }, { status: 400 });
     }

     if (fromId === toId) {
       console.log("Same wallet error");
       return HttpResponse.json({ error: "Source and destination cannot be the same" }, { status: 400 });
     }

     if (amount <= 0) {
       console.log("Invalid amount error");
       return HttpResponse.json({ error: "Invalid amount" }, { status: 400 });
     }

     if (fromWallet.balance < amount) {
       console.log("Insufficient balance error");
       return HttpResponse.json({ error: "Insufficient balance" }, { status: 400 });
     }

     console.log("Before transfer:", { fromBalance: fromWallet.balance, toBalance: toWallet.balance });
     // Perform the transfer
     fromWallet.balance -= amount;
     toWallet.balance += amount;
     console.log("After transfer:", { fromBalance: fromWallet.balance, toBalance: toWallet.balance });

     // Record in transactions
     const transferOutTx = {
       id: (transactions.length + 1).toString(),
       amount,
       date: new Date().toISOString(),
       category: "Transfer Out",
       type: "transfer" as const,
       walletId: fromId,
       description: `Transfer to ${toWallet.name}`,
     };
     const transferInTx = {
       id: (transactions.length + 2).toString(),
       amount,
       date: new Date().toISOString(),
       category: "Transfer In",
       type: "transfer" as const,
       walletId: toId,
       description: `Transfer from ${fromWallet.name}`,
     };
     transactions.unshift(transferOutTx, transferInTx);
     console.log("Transactions added:", { transferOutTx, transferInTx });

     return HttpResponse.json({ success: true, from: fromWallet, to: toWallet });
   }),

   // ✅ NEW: Wallet-specific transactions
   http.get("/api/wallets/:id/transactions", ({ params }: { params: { id: string } }) => {
     const { id } = params;
     const walletTx = transactions.filter((t) => t.walletId === id);

     if (!wallets.some((w) => w.id === id)) {
       return HttpResponse.json({ error: "Wallet not found" }, { status: 404 });
     }

     return HttpResponse.json(walletTx);
   }),

   // ---------- Balance ----------
   http.get("/api/balance", () => {
     const total = wallets.reduce((sum, w) => sum + w.balance, 0);
     const available = total * 0.9;
     const pending = total - available;
     return HttpResponse.json({ total, available, pending });
   }),

   // ---------- Savings Goals ----------
   http.get("/api/savings-goals", () => {
     return HttpResponse.json(savingsGoals);
   }),

   // ---------- Investments ----------
   http.get("/api/investments", () => {
     return HttpResponse.json(investments);
   }),

   // ---------- Analytics ----------
   http.get("/api/analytics", () => {
     const totalTransactions = transactions.length;
     const totalSpent = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
     const avgPerTransaction = totalTransactions > 0 ? transactions.reduce((sum, t) => sum + t.amount, 0) / totalTransactions : 0;
     return HttpResponse.json({
       totalTransactions,
       totalSpent,
       avgPerTransaction,
       monthlyIncome: 4500,
       monthlyExpenses: 3200
     });
   }),

   // ---------- Notifications ----------
   http.get("/api/notifications", () => {
     return HttpResponse.json(notifications);
   }),

   http.put("/api/notifications/:id/read", ({ params }) => {
     const { id } = params as { id: string };
     const notification = notifications.find(n => n.id === id);
     if (!notification) {
       return HttpResponse.json({ error: "Notification not found" }, { status: 404 });
     }
     notification.isRead = true;
     return HttpResponse.json(notification);
   }),

   http.put("/api/notifications/mark-all-read", () => {
     notifications.forEach(n => n.isRead = true);
     return HttpResponse.json({ success: true });
   }),
 ];
