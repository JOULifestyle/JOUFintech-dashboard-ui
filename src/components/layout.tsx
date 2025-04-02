
import React from "react";
import Sidebar from "./Sidebar"; // Make sure Sidebar is implemented
import Header from "./Header"; // Make sure Header is implemented

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="layout">
            <Header /> {/* Ensure Header exists */}
            <Sidebar /> {/* Ensure Sidebar exists */}
            <main>{children}</main> {/* This will render the specific page content */}
        </div>
    );
};

export default Layout;
