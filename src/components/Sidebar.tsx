import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
        <div className="fixed top-20 left-0 h-screen w-50 bg-gray-800 text-white p-5 shadow-lg z-40 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold mb-6">Welcome!</h1>
            <nav className="space-y-4">
                <Link to="/" className="block p-3 hover:bg-gray-700 rounded">🏠 Home</Link>
                <Link to="/investments" className="block p-3 hover:bg-gray-700 rounded">📈 Investments</Link>
                <Link to="/savings" className="block p-3 hover:bg-gray-700 rounded">💰 Savings</Link>
                <Link to="/transactions" className="block p-3 hover:bg-gray-700 rounded">💳 Transactions</Link>
                <Link to="/faqs" className="block p-3 hover:bg-gray-700 rounded">❓ FAQs</Link>
                <Link to="/settings" className="block p-3 hover:bg-gray-700 rounded">⚙️ Settings</Link>
            </nav>
        </div>
    );
};

export default Sidebar;
