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
            <Header toggleSidebar={toggleSidebar} /> {/* Pass toggleSidebar as prop */}

            {/* Button to open/close sidebar */}
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
