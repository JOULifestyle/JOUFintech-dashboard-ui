import React from 'react';
import { motion } from 'framer-motion';

const QuickActions = () => {
    return (
        <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md mx-auto">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Quick Actions</h2>
            <div className="flex flex-col space-y-3">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-300 dark:bg-blue-500 dark:hover:bg-blue-600"
                >
                    Deposit Funds
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-green-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-green-700 transition duration-300 dark:bg-green-500 dark:hover:bg-green-600"
                >
                    Withdraw Funds
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-purple-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-purple-700 transition duration-300 dark:bg-purple-500 dark:hover:bg-purple-600"
                >
                    Start New Investment
                </motion.button>
            </div>
            <div>
                <img
                    src="https://images.pexels.com/photos/1602726/pexels-photo-1602726.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Quick Actions"
                    className="w-full h-60 md:h-100 mt-6 shadow-md rounded-lg object-cover"
                />
            </div>
        </section>
    );
};

export default QuickActions;
