import React, { useState } from "react";

const transactions = [
    { id: 1, date: "2025-03-01", description: "Deposit", amount: 500, type: "credit", balance: 5000 },
    { id: 2, date: "2025-03-03", description: "Investment in Stocks", amount: 2000, type: "debit", balance: 3000 },
    { id: 3, date: "2025-03-10", description: "Deposit", amount: 1500, type: "credit", balance: 4500 },
    { id: 4, date: "2025-03-15", description: "Deposit", amount: 1000, type: "credit", balance: 5500 },
    { id: 5, date: "2025-03-18", description: "Investment in Mutual Funds", amount: 1000, type: "debit", balance: 4500 },
    { id: 6, date: "2025-03-25", description: "Deposit", amount: 3000, type: "credit", balance: 7500 },
];

const TransactionHistory: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredTransactions = transactions.filter(
        (transaction) =>
            transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            transaction.date.includes(searchTerm)
    );

    return (
        <div className="p-6 bg-gray-100 dark:bg-gray-800 min-h-screen overflow-auto">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Transaction History</h2>

            <div className="mb-6 flex items-center space-x-4">
                <input
                    type="text"
                    className="px-4 py-2 w-64 border rounded-md text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700"
                    placeholder="Search by description or date"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Transaction Table */}
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md overflow-x-auto">
                <table className="min-w-full table-auto">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 text-left text-gray-900 dark:text-gray-100">Date</th>
                            <th className="py-2 px-4 text-left text-gray-900 dark:text-gray-100">Description</th>
                            <th className="py-2 px-4 text-left text-gray-900 dark:text-gray-100">Amount</th>
                            <th className="py-2 px-4 text-left text-gray-900 dark:text-gray-100">Type</th>
                            <th className="py-2 px-4 text-left text-gray-900 dark:text-gray-100">Balance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTransactions.map((transaction) => (
                            <tr key={transaction.id} className="border-b dark:border-gray-600">
                                <td className="py-2 px-4 text-gray-900 dark:text-gray-100">{transaction.date}</td>
                                <td className="py-2 px-4 text-gray-900 dark:text-gray-100">{transaction.description}</td>
                                <td
                                    className={`py-2 px-4 ${transaction.type === "credit" ? "text-green-600" : "text-red-600"}`}
                                >
                                    {transaction.type === "credit" ? "+" : "-"}${transaction.amount}
                                </td>
                                <td className="py-2 px-4">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs ${transaction.type === "credit" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}
                                    >
                                        {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                                    </span>
                                </td>
                                <td className="py-2 px-4 text-gray-900 dark:text-gray-100">${transaction.balance}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TransactionHistory;
