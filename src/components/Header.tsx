import React, { useState } from "react";
import { useDarkMode } from "../hooks/useDarkMode";
import { useAuth } from "../context/AuthContext"; // Import Auth Context
import { Moon, Sun, X } from "lucide-react";

const Header = () => {
    const { theme, toggleTheme } = useDarkMode();
    const { isLoggedIn, user, login, logout } = useAuth(); // Use authentication
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [fullName, setFullName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const getInitials = (name: string) =>
        name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase();

    const handleLogin = async () => {
        setError(""); // Clear previous error
        try {
            await login(fullName);
            setShowLoginModal(false); // Close modal after successful login
        } catch (err) {
            setError("Invalid name or password"); // Show error
        }
    };

    return (
        <>
            {/* Header */}
            <header className="fixed top-0 left-0 w-full h-20 bg-blue-600 dark:bg-gray-900 text-white flex justify-between items-center px-6 py-4 shadow-md z-50">
                <h1 className="text-2xl font-bold">JOUFintech</h1>

                {/* Search Bar */}
                <div className="flex-grow max-w-md ml-auto">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full px-4 py-2 rounded-md text-gray-900 dark:text-white bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500"
                    />
                </div>

                {/* User Section */}
                <div className="flex items-center space-x-4 ml-4">
                    {/* Dark Mode Toggle (Always Visible) */}
                    <button
                        onClick={toggleTheme}
                        className="p-2 bg-gray-200 dark:bg-gray-700 rounded"
                    >
                        {theme === "dark" ? (
                            <Sun className="text-yellow-400" />
                        ) : (
                            <Moon className="text-gray-800" />
                        )}
                    </button>

                    {/* User Avatar & Name (only if logged in) */}
                    {isLoggedIn && user && (
                        <>
                            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-500 text-white text-lg font-bold border-2 border-white">
                                {getInitials(user.name)}
                            </div>
                            <span className="hidden sm:inline">{user.name}</span>
                        </>
                    )}

                    {/* Login / Logout Buttons */}
                    {isLoggedIn ? (
                        <button
                            onClick={logout}
                            className="bg-red-500 px-4 py-2 rounded-md hover:bg-red-600 transition"
                        >
                            Logout
                        </button>
                    ) : (
                        <button
                            onClick={() => setShowLoginModal(true)}
                            className="bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-600 transition"
                        >
                            Login / Sign Up
                        </button>
                    )}
                </div>
            </header>

            {/* Adjusted Content Spacing */}
            <div className="pt-16"></div>

            {/* Login Modal */}
            {showLoginModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white dark:bg-gray-800 text-black dark:text-white p-6 rounded-lg shadow-lg w-96 relative">
                        <button
                            className="absolute top-2 right-2 text-gray-700 dark:text-gray-400"
                            onClick={() => setShowLoginModal(false)}
                        >
                            <X size={24} />
                        </button>
                        <h2 className="text-lg font-semibold mb-4 text-center">
                            Login / Sign Up
                        </h2>
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="w-full mb-2 px-3 py-2 border rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full mb-4 px-3 py-2 border rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                        <button
                            onClick={handleLogin}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md w-full hover:bg-blue-600"
                        >
                            Login
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Header;
