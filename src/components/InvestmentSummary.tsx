import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";

const portfolioData = [
    { name: "Stocks", value: 2000 },
    { name: "Bonds", value: 2000 },
    { name: "Real Estate", value: 8000 },
    { name: "Crypto", value: 10000 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const performanceData = [
    { month: "Jan", value: 5000 },
    { month: "Feb", value: 5200 },
    { month: "Mar", value: 4900 },
    { month: "Apr", value: 5300 },
    { month: "May", value: 5500 },
    { month: "Jun", value: 5700 },
];

const InvestmentSummary = () => {
    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Investment Portfolio</h3>
            <p className="text-gray-700 dark:text-gray-300">
                Risk Level: <span className="font-bold text-yellow-600">Medium</span>
            </p>

            <h4 className="text-lg font-semibold mt-4 text-gray-900 dark:text-white">Portfolio Breakdown</h4>
            <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                    <Pie data={portfolioData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label>
                        {portfolioData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>

            <h4 className="text-lg font-semibold mt-6 text-gray-900 dark:text-white">Recent Performance</h4>
            <ResponsiveContainer width="100%" height={250}>
                <LineChart data={performanceData}>
                    <XAxis dataKey="month" stroke="#8884d8" />
                    <YAxis stroke="#8884d8" />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#82ca9d" strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default InvestmentSummary;
