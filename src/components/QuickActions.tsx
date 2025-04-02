import React from 'react';
import { motion } from 'framer-motion';

const QuickActions = () => {
    return (
        <section className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mx-auto dark:bg-gray-900 text-gray-900 dark:text-gray-100 mt-10">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
            <div className="flex flex-col space-y-3">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                    Deposit Funds
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-green-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-green-700 transition duration-300"
                >
                    Withdraw Funds
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-purple-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-purple-700 transition duration-300"
                >
                    Start New Investment
                </motion.button>
            </div>
            <div>
                <img src="https://images.pexels.com/photos/1602726/pexels-photo-1602726.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Quick Actions" className="w-200 h-80 mt-10 shadow-md" />
            </div>
        </section>
    )
};

export default QuickActions;
