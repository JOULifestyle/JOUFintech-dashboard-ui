import { Link } from "react-router-dom";

interface SidebarProps {
    isSidebarOpen: boolean;
    setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen, setIsSidebarOpen }) => {
    const handleLinkClick = () => {
        setIsSidebarOpen(false); // Close sidebar when a link is clicked
    };

    return (
        <div
            className={`fixed top-0 left-0 h-screen w-50 bg-gray-800 text-white p-5 shadow-lg z-40 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen transition-all duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
            <h1 className="text-2xl font-bold mb-6">Welcome!</h1>
            <nav className="space-y-4">
                <Link to="/" className="block p-3 hover:bg-gray-700 rounded" onClick={handleLinkClick}>
                    🏠 Home
                </Link>
                <Link to="/investments" className="block p-3 hover:bg-gray-700 rounded" onClick={handleLinkClick}>
                    📈 Investments
                </Link>
                <Link to="/savings" className="block p-3 hover:bg-gray-700 rounded" onClick={handleLinkClick}>
                    💰 Savings
                </Link>
                <Link to="/transactions" className="block p-3 hover:bg-gray-700 rounded" onClick={handleLinkClick}>
                    💳 Transactions
                </Link>
                <Link to="/faqs" className="block p-3 hover:bg-gray-700 rounded" onClick={handleLinkClick}>
                    ❓ FAQs
                </Link>
                <Link to="/settings" className="block p-3 hover:bg-gray-700 rounded" onClick={handleLinkClick}>
                    ⚙️ Settings
                </Link>
            </nav>
        </div>
    );
};

export default Sidebar;
