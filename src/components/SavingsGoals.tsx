import React from "react";

const SavingsComponent = () => {
    const savingsGoals = [
        {
            name: "Emergency Fund",
            target: 10000,
            current: 3500,
        },
        {
            name: "Vacation Fund",
            target: 5000,
            current: 2000,
        },
        {
            name: "Retirement Fund",
            target: 50000,
            current: 2000,
        },
    ];

    return (
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md w-full max-w-lg mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Savings Goals</h2>
            <div className="space-y-4">
                {savingsGoals.map((goal, index) => (
                    <div key={index} className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-sm">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-200">{goal.name}</h3>
                        <p className="text-gray-600 dark:text-gray-400">Target: ${goal.target.toLocaleString()}</p>
                        <p className="text-gray-600 dark:text-gray-400">Current: ${goal.current.toLocaleString()}</p>

                        {/* Progress Bar */}
                        <div className="w-full bg-gray-300 dark:bg-gray-600 rounded-full h-2.5 mt-2">
                            <div
                                className="bg-blue-600 dark:bg-blue-400 h-2.5 rounded-full transition-all"
                                style={{ width: `${(goal.current / goal.target) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Encouragement Text */}
            <div className="text-center mt-8">
                <h3 className="font-bold text-lg text-gray-900 dark:text-gray-200 shadow-md">Plan ahead! You will never regret it.</h3>
                <p className="font-medium text-gray-700 dark:text-gray-300 mt-2">Set your savings goals and track your progress.</p>
            </div>
        </div>
    );
};

export default SavingsComponent;
