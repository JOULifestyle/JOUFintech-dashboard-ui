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
        axios.get<Transaction[]>("https://api.example.com/transactions")
            .then(res => setTransactions(res.data))
            .catch(err => console.error("Error fetching transactions", err));
    }, []);

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Recent Transactions</h3>
            <div className="space-y-2">
                {transactions.map((tx, index) => (
                    <div key={index} className="flex justify-between p-2 border-b">
                        <span>{tx.date}</span>
                        <span className="font-semibold">{tx.type}</span>
                        <span className={`text-${tx.type === "Deposit" ? "green" : "red"}-600`}>${tx.amount}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TransactionHistory;
