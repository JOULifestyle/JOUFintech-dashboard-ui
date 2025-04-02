import React from "react";
import Sidebar from "./Sidebar"; // Make sure Sidebar is implemented
import Header from "./Header"; // Make sure Header is implemented

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
            {/* Header */}
            <Header /> {/* Ensure Header exists */}

            {/* Main content area (with Sidebar on large screens) */}
            <div className="flex flex-1">
                {/* Sidebar */}
                <div className="hidden md:block w-64 bg-gray-800 text-white p-4">
                    <Sidebar /> {/* Ensure Sidebar exists */}
                </div>

                {/* Main Content Area */}
                <main className="flex-1 p-6 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
                    {children} {/* This will render the specific page content */}
                </main>
            </div>
        </div>
    );
};

export default Layout;
