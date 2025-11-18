import { parseISO, format } from "date-fns";
import type { Transaction } from "../../api/transactions";

export const getCurrencySymbol = (currency: string) => {
  switch (currency) {
    case 'USD':
      return '$';
    case 'EUR':
      return '€';
    case 'GBP':
      return '£';
    case 'NGN':
      return '₦';
    default:
      return '$';
  }
};

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

// AI-powered dynamic insights
export function generateInsights(transactions: Transaction[]) {
  const insights: string[] = [];
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  // Separate current month vs previous month transactions
  const currentMonthTx = transactions.filter(tx => {
    const txDate = new Date(tx.date);
    return txDate.getMonth() === currentMonth && txDate.getFullYear() === currentYear;
  });

  const lastMonthTx = transactions.filter(tx => {
    const txDate = new Date(tx.date);
    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    return txDate.getMonth() === lastMonth && txDate.getFullYear() === lastMonthYear;
  });

  // Spending trend analysis
  const currentSpending = currentMonthTx.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
  const lastSpending = lastMonthTx.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);

  if (lastSpending > 0) {
    const spendingChange = ((currentSpending - lastSpending) / lastSpending) * 100;
    if (spendingChange > 10) {
      insights.push(`🚨 Your spending increased by ${spendingChange.toFixed(0)}% compared to last month. Consider reviewing your budget.`);
    } else if (spendingChange < -10) {
      insights.push(`💰 Great job! You reduced spending by ${Math.abs(spendingChange).toFixed(0)}% compared to last month.`);
    }
  }

  // Category analysis
  const categories = Array.from(new Set(transactions.map(t => t.category)));
  categories.forEach(cat => {
    const currentCatSpending = currentMonthTx.filter(t => t.category === cat && t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
    const lastCatSpending = lastMonthTx.filter(t => t.category === cat && t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);

    if (lastCatSpending > 0 && currentCatSpending > 0) {
      const catChange = ((currentCatSpending - lastCatSpending) / lastCatSpending) * 100;
      if (catChange > 20) {
        insights.push(`📈 ${cat} spending surged by ${catChange.toFixed(0)}%. Is this expected?`);
      } else if (catChange < -20) {
        insights.push(`📉 You cut ${cat} spending by ${Math.abs(catChange).toFixed(0)}% - excellent savings!`);
      }
    }
  });

  // Income vs expenses
  const currentIncome = currentMonthTx.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const savingsRate = currentIncome > 0 ? ((currentIncome - currentSpending) / currentIncome) * 100 : 0;

  if (savingsRate > 20) {
    insights.push(`🎯 Excellent savings rate of ${savingsRate.toFixed(0)}%! You're building wealth effectively.`);
  } else if (savingsRate < 0) {
    insights.push(`⚠️ You're spending more than you earn this month. Consider cutting expenses or increasing income.`);
  }

  // Transaction frequency
  const transactionCount = currentMonthTx.length;
  const avgDailyTransactions = transactionCount / new Date(currentYear, currentMonth + 1, 0).getDate();

  if (avgDailyTransactions > 3) {
    insights.push(`🔄 High transaction frequency (${avgDailyTransactions.toFixed(1)} per day). Track your spending habits closely.`);
  }

  // Largest expense category
  const categoryTotals = categories.map(cat => ({
    category: cat,
    total: currentMonthTx.filter(t => t.category === cat && t.type === 'expense').reduce((sum, t) => sum + t.amount, 0)
  })).sort((a, b) => b.total - a.total);

  if (categoryTotals.length > 0 && categoryTotals[0].total > 0) {
    const topCategory = categoryTotals[0];
    const percentage = currentSpending > 0 ? (topCategory.total / currentSpending) * 100 : 0;
    if (percentage > 30) {
      insights.push(`🎯 ${topCategory.category} dominates your budget at ${percentage.toFixed(0)}% of total spending.`);
    }
  }

  // Weekly spending pattern
  const weeklySpending = [0, 0, 0, 0];
  currentMonthTx.filter(t => t.type === 'expense').forEach(tx => {
    const week = Math.floor(new Date(tx.date).getDate() / 7);
    if (week < 4) weeklySpending[week] += tx.amount;
  });

  const avgWeekly = weeklySpending.reduce((sum, week) => sum + week, 0) / 4;
  const lastWeek = weeklySpending[3];
  if (lastWeek > avgWeekly * 1.5) {
    insights.push(`📊 Last week spending was ${((lastWeek / avgWeekly - 1) * 100).toFixed(0)}% above average. Monitor closely.`);
  }

  // Ensure we have at least some insights, even if basic ones
  if (insights.length === 0) {
    if (currentSpending > 0) {
      insights.push(`💡 You're actively tracking expenses - keep up the great financial awareness!`);
    }
    if (currentIncome > currentSpending) {
      insights.push(`💰 You're spending less than you earn this month. Consider investing the surplus.`);
    }
    insights.push(`📊 Regular expense tracking helps you make better financial decisions.`);
  }

  // Limit to 4 insights max for UI
  return insights.slice(0, 4);
}
