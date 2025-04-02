import React, { useState } from "react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const savingsData = [
    { month: "Jan", savings: 1500, goalCompletion: 10 },
    { month: "Feb", savings: 2500, goalCompletion: 20 },
    { month: "Mar", savings: 3000, goalCompletion: 30 },
    { month: "Apr", savings: 4500, goalCompletion: 50 },
    { month: "May", savings: 6000, goalCompletion: 60 },
    { month: "Jun", savings: 7500, goalCompletion: 70 },
];

const savingsMethods = [
    { name: "Recurring Deposits", description: "Invest a fixed amount periodically for guaranteed returns.", minAmount: "$100" },
    { name: "Stocks & Bonds", description: "High-risk but potentially high-return investments.", minAmount: "$500" },
    { name: "Mutual Funds", description: "Diversified and less risky option for steady growth.", minAmount: "$250" },
    { name: "Real Estate", description: "Invest in properties for long-term savings growth.", minAmount: "$10,000" },
];

const savingsGoals = [
    { goal: "Emergency Fund", targetAmount: "$10,000", currentAmount: "$3,500" },
    { goal: "Vacation Fund", targetAmount: "$5,000", currentAmount: "$2,000" },
    { goal: "Retirement Fund", targetAmount: "$50,000", currentAmount: "$15,000" },
];

const Savings = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar toggle state

    return (
        <div className={`p-6 bg-gray-100 dark:bg-gray-800 min-h-screen transition-all duration-300 
            ${isSidebarOpen ? "ml-64" : "ml-0"}`} // Fullscreen layout when sidebar is open
        >
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Savings Overview</h2>

            {/* Stats Section */}
            <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-700 dark:text-white">
                    <h3 className="text-lg font-semibold">Total Savings</h3>
                    <p className="text-2xl font-bold text-blue-600"> $7,500 </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-700 dark:text-white">
                    <h3 className="text-lg font-semibold">Goal Completion</h3>
                    <p className="text-2xl font-bold text-green-600">60%</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-700 dark:text-white">
                    <h3 className="text-lg font-semibold">Active Savings Plans</h3>
                    <p className="text-2xl font-bold text-purple-600">3</p>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-700 dark:text-white">
                    <h3 className="text-lg font-semibold mb-4">Savings Growth</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={savingsData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="savings" stroke="#82ca9d" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-700 dark:text-white">
                    <h3 className="text-lg font-semibold mb-4">Goal Completion</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={savingsData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="goalCompletion" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Savings Methods Section */}
            <h3 className="text-xl font-bold mt-6 mb-4 text-gray-800 dark:text-white">Ways to Build Your Savings</h3>
            <div className="grid md:grid-cols-2 gap-6">
                {savingsMethods.map((method, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-700 dark:text-white">
                        <h4 className="text-lg font-semibold">{method.name}</h4>
                        <p className="text-gray-600 dark:text-gray-300">{method.description}</p>
                        <p className="text-gray-600 dark:text-gray-300">Min Amount: {method.minAmount}</p>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition mt-4">
                            Save Now
                        </button>
                    </div>
                ))}
            </div>

            {/* Savings Goals Section */}
            <h3 className="text-xl font-bold mt-6 mb-4 text-gray-800 dark:text-white">Savings Goals</h3>
            <div className="grid md:grid-cols-2 gap-6">
                {savingsGoals.map((goal, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center dark:bg-gray-700 dark:text-white">
                        <div>
                            <h4 className="text-lg font-semibold">{goal.goal}</h4>
                            <p className="text-gray-600 dark:text-gray-300">Target: {goal.targetAmount}</p>
                            <p className="text-gray-600 dark:text-gray-300">Current: {goal.currentAmount}</p>
                        </div>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
                            Save Now
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Savings;
