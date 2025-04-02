import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const ChartComponent = () => {
    // Investment Growth Data (Bar Chart)
    const investmentData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
            {
                label: "Investment Growth ($)",
                data: [500, 1200, 1800, 2600, 3500, 5000],
                backgroundColor: "#4CAF50",
                borderColor: "#388E3C",
                borderWidth: 1,
            },
        ],
    };

    // Savings Distribution Data (Pie Chart)
    const savingsData = {
        labels: ["Emergency Fund", "Retirement", "Education", "Vacation"],
        datasets: [
            {
                label: "Savings Breakdown ($)",
                data: [4000, 7000, 3500, 2000],
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
            },
        ],
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Investment & Savings Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Investment Growth Chart */}
                <div className="p-4 border rounded-md bg-gray-50">
                    <h3 className="text-lg font-medium mb-2">Investment Growth</h3>
                    <Bar data={investmentData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
                </div>

                {/* Savings Distribution Chart */}
                <div className="p-4 border rounded-md bg-gray-50">
                    <h3 className="text-lg font-medium mb-2">Savings Distribution</h3>
                    <Pie data={savingsData} options={{ responsive: true }} />
                </div>
            </div>
        </div>
    );
};

export default ChartComponent;
