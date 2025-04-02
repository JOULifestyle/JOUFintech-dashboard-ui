import { useState } from "react";
import InvestmentSummary from "../components/InvestmentSummary";
import SavingsGoals from "../components/SavingsGoals";
import TransactionHistory from "../components/TransactionHistory";
import QuickActions from "../components/QuickActions";
import Chart from "../components/Chart";

const Dashboard = () => {
    const [user] = useState({
        fullName: "Israel Olasehinde",
        savingsBalance: 7500,
        investmentBalance: 22000
    });
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className={`min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-all duration-300 
            ${isSidebarOpen ? "ml-64" : "ml-0"} `}
        >
            {/* Welcome & Balance Section */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col gap-6 md:flex-row md:justify-between md:items-center">
                {/* Welcome Text */}
                <div className="text-center md:text-left">
                    <h2 className="text-2xl md:text-3xl font-bold">Welcome, {user.fullName} 👋</h2>
                    <p className="text-gray-600 dark:text-gray-300 mt-2">
                        Here’s an overview of your financial health.
                    </p>
                </div>

                {/* Balance Display */}
                <div className="flex flex-col items-center md:items-end space-y-2">
                    <div className="bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg w-full text-center md:text-right">
                        <p className="text-lg font-semibold">
                            Savings Balance: <span className="text-green-600 dark:text-green-400">${user.savingsBalance.toLocaleString()}</span>
                        </p>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg w-full text-center md:text-right">
                        <p className="text-lg font-semibold">
                            Investment Balance: <span className="text-blue-600 dark:text-blue-400">${user.investmentBalance.toLocaleString()}</span>
                        </p>
                    </div>
                </div>
            </div>

            {/* JOUFintech Section */}
            <div className="bg-blue-600 text-white p-6 rounded-lg shadow-md flex flex-col md:flex-row items-center gap-6 mt-6">
                <div className="flex-1 text-center md:text-left">
                    <h3 className="text-2xl font-semibold">JOUFintech: Your Trusted Financial Partner</h3>
                    <p className="mt-2 text-lg">
                        We help you save, invest, and secure your future with smart financial solutions tailored for you.
                    </p>
                </div>
                <img
                    src="https://www.joulifestyle.com/wp-content/uploads/2024/10/whychooseus3-removebg-preview-copy.png"
                    alt="Happy Employee"
                    className="w-32 h-32 md:w-40 md:h-40 rounded-full shadow-lg"
                    onError={(e) => (e.currentTarget.style.display = "none")} // Hide if image fails to load
                />
            </div>

            {/* Grid Section for Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                <InvestmentSummary />
                <SavingsGoals />
                <QuickActions />
            </div>

            {/* Chart Section */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mt-6">
                <Chart />
            </div>

            {/* Customer Testimonial Section */}
            <div className="bg-gray-200 dark:bg-gray-700 p-6 rounded-lg shadow-md flex flex-col md:flex-row items-center gap-6 mt-6">
                <img
                    src="https://images.pexels.com/photos/4484071/pexels-photo-4484071.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Happy Customer"
                    className="w-32 h-32 md:w-40 md:h-40 rounded-full shadow-lg"
                />
                <div className="text-center md:text-left">
                    <h3 className="text-xl font-semibold">What Our Customers Say</h3>
                    <p className="mt-2 text-gray-700 dark:text-gray-300 italic">
                        "JOUFintech has transformed the way I manage my finances. The investment tools and savings goals have been a game-changer for me!"
                    </p>
                    <p className="mt-2 font-bold">- Orujah Anebi</p>
                </div>
            </div>

            {/* Transaction History */}
            <TransactionHistory />
        </div>
    );
};

export default Dashboard;
