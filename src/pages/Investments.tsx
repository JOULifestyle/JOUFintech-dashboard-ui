import React from "react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const investmentsData = [
    { month: "Jan", investment: 5000, growth: 7 },
    { month: "Feb", investment: 7000, growth: 10 },
    { month: "Mar", investment: 10000, growth: 15 },
    { month: "Apr", investment: 15000, growth: 20 },
    { month: "May", investment: 18000, growth: 25 },
    { month: "Jun", investment: 22000, growth: 30 },
];

const investmentOpportunities = [
    { id: 1, name: "Real Estate Fund", roi: "8% per annum", minInvestment: "$5,000" },
    { id: 2, name: "Tech Startup Equity", roi: "15% projected", minInvestment: "$10,000" },
    { id: 3, name: "Government Bonds", roi: "5% fixed", minInvestment: "$1,000" },
    { id: 4, name: "Crypto Index Fund", roi: "20% variable", minInvestment: "$3,000" },
];

const Investments = () => {
    return (
        <div className="p-6 bg-gray-100 dark:bg-gray-800 min-h-screen ml-60">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Investment Overview</h2>

            {/* Summary Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-700 dark:text-white">
                    <h3 className="text-lg font-semibold">Total Investment</h3>
                    <p className="text-2xl font-bold text-blue-600"> $22,000 </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-700 dark:text-white">
                    <h3 className="text-lg font-semibold">ROI</h3>
                    <p className="text-2xl font-bold text-green-600">30%</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-700 dark:text-white">
                    <h3 className="text-lg font-semibold">Active Plans</h3>
                    <p className="text-2xl font-bold text-purple-600">5</p>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
                {/* Investment Growth Chart */}
                <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-700 dark:text-white">
                    <h3 className="text-lg font-semibold mb-4">Investment Growth</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={investmentsData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="growth" stroke="#8884d8" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Investment Breakdown Chart */}
                <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-700 dark:text-white">
                    <h3 className="text-lg font-semibold mb-4">Investment Breakdown</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={investmentsData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="investment" fill="#82ca9d" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Investment Opportunities Section */}
            <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">Investment Opportunities</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {investmentOpportunities.map((investment) => (
                    <div key={investment.id} className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-700 dark:text-white">
                        <h4 className="text-lg font-semibold">{investment.name}</h4>
                        <p className="text-gray-600 dark:text-gray-300">ROI: {investment.roi}</p>
                        <p className="text-gray-600 dark:text-gray-300">Min. Investment: {investment.minInvestment}</p>
                        <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
                            Invest Now
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Investments;
