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
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Savings Goals</h2>
            <div className="space-y-4">
                {savingsGoals.map((goal, index) => (
                    <div key={index} className="p-4 bg-gray-100 rounded-lg shadow-sm">
                        <h3 className="text-lg font-semibold">{goal.name}</h3>
                        <p className="text-gray-600">Target: ${goal.target.toLocaleString()}</p>
                        <p className="text-gray-600">Current: ${goal.current.toLocaleString()}</p>
                        <div className="w-full bg-gray-300 rounded-full h-2.5 mt-2">
                            <div
                                className="bg-blue-600 h-2.5 rounded-full"
                                style={{ width: `${(goal.current / goal.target) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>
            <div>
                <h3 className=" font-bold mt-10 shadow-md" >Plan ahead! You will never regret it.</h3>
                <p className=" font-bold mt-8 shadow-md" >Set your savings goals and track your progress.</p>
            </div>
        </div>
    );
};

export default SavingsComponent;
