import axios from "axios";

const API_BASE_URL = "https://api.example.com"; // Replace with actual API URL

export const fetchFinancialData = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/finance-data`);
        return response.data;
    } catch (error) {
        console.error("Error fetching financial data:", error);
        return null;
    }
};

export const fetchDashboardData = async () => {
    const response = await fetch("/api/dashboard"); // Adjust the API URL if needed
    if (!response.ok) {
        throw new Error("Failed to fetch dashboard data");
    }
    return response.json();
};

