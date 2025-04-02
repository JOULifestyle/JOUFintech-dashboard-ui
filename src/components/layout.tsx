import React, { useState } from "react";
import Sidebar from "./Sidebar"; // Make sure Sidebar is imported
import Header from "./Header"; // Make sure Header is imported

const Layout = ({ children }: { children: React.ReactNode }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar state management

    const toggleSidebar = () => {
        setIsSidebarOpen((prev) => !prev); // Toggle sidebar open/close state
    };

    return (
        <div className="relative">
            <Header setIsSidebarOpen={setIsSidebarOpen} /> {/* Pass setIsSidebarOpen to Header */}

            {/* Button to open/close sidebar */}
            <button
                onClick={toggleSidebar}
                className="fixed top-5 left-5 z-50 p-3 bg-gray-800 text-white rounded-full shadow-lg focus:outline-none lg:hidden"
            >
                {/* This is the hamburger menu icon */}
                <span className="material-icons">menu</span>
            </button>

            {/* Sidebar */}
            <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

            {/* Main content area with dynamic left margin when sidebar is open */}
            <main
                className={`transition-all duration-300 ${isSidebarOpen ? "ml-60" : "ml-0" // Adjust the left margin based on sidebar state
                    }`}
            >
                {children} {/* This will render the specific page content */}
            </main>
        </div>
    );
};

export default Layout;
