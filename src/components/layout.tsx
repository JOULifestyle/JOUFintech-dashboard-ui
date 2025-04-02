import React from "react";
import Sidebar from "./Sidebar"; // Make sure Sidebar is implemented
import Header from "./Header"; // Make sure Header is implemented
import { useState } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Track sidebar visibility on mobile

    return (
        <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
            {/* Header */}
            <Header /> {/* Ensure Header exists */}

            {/* Main content area (with Sidebar on large screens) */}
            <div className="flex flex-1">
                {/* Sidebar */}
                <div
                    className={`fixed top-0 left-0 h-screen bg-gray-800 text-white p-5 shadow-lg z-40 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen 
                    ${isSidebarOpen ? "block" : "hidden"} md:block`} // Show sidebar on mobile if isSidebarOpen is true
                >
                    <Sidebar />
                </div>

                {/* Main Content Area */}
                <main
                    className={`flex-1 p-6 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-all duration-300 
                    ${isSidebarOpen ? "ml-64" : "ml-0"} md:ml-64`} // Add margin to content when sidebar is open
                >
                    {children} {/* This will render the specific page content */}
                </main>
            </div>
        </div>
    );
};

export default Layout;
