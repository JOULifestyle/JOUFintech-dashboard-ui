import { useState } from "react";
import Sidebar from "./Sidebar"; // Ensure Sidebar is imported
import Header from "./Header"; // Ensure Header is imported

const Layout = ({ children }: { children: React.ReactNode }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar state management

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar open/close state
    };

    return (
        <div className="relative">
            <Header /> {/* Ensure Header exists */}

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

            <main>{children}</main> {/* This will render the specific page content */}
        </div>
    );
};

export default Layout;
