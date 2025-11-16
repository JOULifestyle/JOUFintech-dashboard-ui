import { parseISO, format } from "date-fns";
import type { Transaction } from "../../api/transactions";

// Group transactions by month for line chart
export function groupByMonth(transactions: Transaction[]) {
  const monthMap: Record<string, number> = {};

  transactions.forEach((tx) => {
    if (tx.status === "pending") return;
    const month = format(parseISO(tx.date), "yyyy-MM");
    monthMap[month] = (monthMap[month] || 0) + tx.amount;
  });

  return Object.entries(monthMap).map(([month, total]) => ({ month, total }));
}

// Group transactions by category for pie chart
export function groupByCategory(transactions: Transaction[]) {
  const catMap: Record<string, number> = {};
  transactions.forEach((tx) => {
    if (tx.status === "pending") return;
    catMap[tx.category] = (catMap[tx.category] || 0) + tx.amount;
  });

  return Object.entries(catMap).map(([name, value]) => ({ name, value }));
}

// Simple insights
export function generateInsights(transactions: Transaction[], lastMonthTx: Transaction[]) {
  const insights: string[] = [];
  const categories = Array.from(new Set(transactions.map((t) => t.category)));

  categories.forEach((cat) => {
    const thisMonthTotal = transactions.filter((t) => t.category === cat).reduce((a, b) => a + b.amount, 0);
    const lastMonthTotal = lastMonthTx.filter((t) => t.category === cat).reduce((a, b) => a + b.amount, 0);

    if (lastMonthTotal === 0) return;
    const delta = ((thisMonthTotal - lastMonthTotal) / lastMonthTotal) * 100;
    if (delta >= 5) insights.push(`You spent ${delta.toFixed(0)}% more on ${cat} this month`);
    if (delta <= -5) insights.push(`You spent ${Math.abs(delta).toFixed(0)}% less on ${cat} this month`);
  });

  return insights;
}
