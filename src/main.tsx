import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';
import App from './App';
import React from "react";
import ReactDOM from "react-dom/client";
import { useDarkMode } from "./hooks/useDarkMode";
import { AuthProvider } from "./context/AuthContext";


const theme = localStorage.getItem("theme") || "light";
if (theme === "dark") {
  document.documentElement.classList.add("dark");
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <AuthProvider>
    <App />
  </AuthProvider>
);