import InvestmentSummary from "../components/InvestmentSummary";
import SavingsGoals from "../components/SavingsGoals";
import TransactionHistory from "../components/TransactionHistory";
import QuickActions from "../components/QuickActions";
import Chart from "../components/Chart";
import { useState } from "react";

const Dashboard = () => {
    const [user] = useState({ fullName: "Israel Olasehinde", savingsBalance: 7500, investmentBalance: 22000 });

    return (
        <div className="space-y-6 p-6 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen ml-60">
            {/* Welcome Section */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col md:flex-row justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold">Welcome, {user.fullName} 👋</h2>
                    <p className="text-gray-600 dark:text-gray-300 mt-2">
                        Here’s an overview of your financial health.
                    </p>
                </div>
                <div className="text-right">
                    <p className="text-lg font-semibold">
                        Savings Balance: <span className="text-green-600 dark:text-green-400">${user.savingsBalance}</span>
                    </p>
                    <p className="text-lg font-semibold">
                        Investment Balance: <span className="text-blue-600 dark:text-blue-400">${user.investmentBalance}</span>
                    </p>
                </div>
            </div>

            {/* Company Statement Section */}
            <div className="bg-blue-600 text-white p-6 rounded-lg shadow-md flex flex-col md:flex-row items-center">
                <div className="flex-1">
                    <h3 className="text-2xl font-semibold">JOUFintech: Your Trusted Financial Partner</h3>
                    <p className="mt-2 text-lg">
                        We help you save, invest, and secure your future with smart financial solutions tailored for you.
                    </p>
                </div>
                <img
                    src="https://www.joulifestyle.com/wp-content/uploads/2024/10/whychooseus3-removebg-preview-copy.png"
                    alt="Happy Employee"
                    className="w-40 h-40 rounded-full shadow-lg mt-4 md:mt-0"
                    onError={(e) => (e.currentTarget.style.display = "none")} // Hide if image fails to load
                />
            </div>

            {/* Core Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <InvestmentSummary />
                <SavingsGoals />
                <QuickActions />
            </div>

            {/* Performance Chart */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <Chart />
            </div>

            {/* Customer Review Section */}
            <div className="bg-gray-200 dark:bg-gray-700 p-6 rounded-lg shadow-md flex flex-col md:flex-row items-center">
                <img
                    src="https://images.pexels.com/photos/4484071/pexels-photo-4484071.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Happy Customer"
                    className="w-40 h-40 rounded-full shadow-lg mb-4 md:mb-0 md:mr-6"
                />
                <div>
                    <h3 className="text-xl font-semibold">What Our Customers Say</h3>
                    <p className="mt-2 text-gray-700 dark:text-gray-300 italic">
                        "JOUFintech has transformed the way I manage my finances. The investment tools and savings goals have been a game-changer for me!"
                    </p>
                    <p className="mt-2 font-bold">- Orujah Anebi</p>
                </div>
            </div>

            {/* Transaction History */}
            <TransactionHistory />
            <p className="mt-2 text-gray-700 dark:text-gray-300 italic">
                Your recent transaction history will appear here
            </p>
        </div>
    );
};

export default Dashboard;
