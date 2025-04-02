import { useState, useEffect } from "react";
import axios from "axios";

interface Transaction {
    date: string;
    type: string;
    amount: number;
}

const TransactionHistory = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        axios
            .get<Transaction[]>("https://api.example.com/transactions")
            .then((res) => setTransactions(res.data))
            .catch((err) => console.error("Error fetching transactions", err));
    }, []);

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg mx-auto">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Recent Transactions</h3>

            <div className="space-y-2">
                {transactions.length > 0 ? (
                    transactions.map((tx, index) => (
                        <div key={index} className="flex justify-between items-center p-3 border-b dark:border-gray-700 text-gray-800 dark:text-gray-200">
                            <span className="text-sm">{tx.date}</span>
                            <span className="font-semibold">{tx.type}</span>
                            <span className={`${tx.type === "Deposit" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"} font-semibold`}>
                                ${tx.amount}
                            </span>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500 dark:text-gray-400">No transactions found.</p>
                )}
            </div>
        </div>
    );
};

export default TransactionHistory;
