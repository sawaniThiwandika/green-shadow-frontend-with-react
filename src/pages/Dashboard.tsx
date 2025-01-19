import React from "react";
import { Line, Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { motion } from "framer-motion";

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

export function Dashboard() {

    const statistics = [
        {
            title: "Total Fields",
            value: "45",
            icon: "🌱",
            color: "from-yellow-400 to-yellow-600",
        },
        {
            title: "Staff Members",
            value: "12",
            icon: "👩‍🌾",
            color: "from-blue-400 to-blue-600",
        },
        {
            title: "Active Equipment",
            value: "18",
            icon: "⚙️",
            color: "from-purple-400 to-purple-600",
        },
        {
            title: "Total Crops",
            value: "50",
            icon: "🌾",
            color: "from-green-400 to-green-600",
        },
    ];


    const lineChartData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
            {
                label: "Crops Harvested",
                data: [50, 75, 100, 125, 150, 200],
                borderColor: "#22c55e",
                backgroundColor: "rgba(34, 197, 94, 0.2)",
                tension: 0.4,
            },
            {
                label: "New Fields Added",
                data: [10, 15, 20, 30, 45, 60],
                borderColor: "#3b82f6",
                backgroundColor: "rgba(59, 130, 246, 0.2)",
                tension: 0.4,
            },
        ],
    };

    const lineChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: "top" as const,
            },
            title: {
                display: true,
                text: "Monthly Performance Overview",
            },
        },
    };


    const barChartData = {
        labels: ["Q1", "Q2", "Q3", "Q4"],
        datasets: [
            {
                label: "Equipment Usage (hrs)",
                data: [100, 200, 150, 250],
                backgroundColor: ["#f97316", "#22d3ee", "#eab308", "#4ade80"],
            },
        ],
    };

    const barChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: "top" as const,
            },
            title: {
                display: true,
                text: "Quarterly Equipment Usage",
            },
        },
    };

    return (
        <div className="container mx-auto p-6">

            <motion.h1
                className="text-3xl font-bold text-gray-800 mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                Dashboard
            </motion.h1>


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {statistics.map((stat, index) => (
                    <motion.div
                        key={index}
                        className={`p-6 bg-gradient-to-r ${stat.color} text-white rounded-lg shadow-md`}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.2, duration: 0.6 }}
                    >
                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="text-lg font-semibold">{stat.title}</h2>
                                <p className="text-3xl font-bold">{stat.value}</p>
                            </div>
                            <div className="text-5xl">{stat.icon}</div>
                        </div>
                    </motion.div>
                ))}
            </div>


            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                <motion.div
                    className="bg-white rounded-lg shadow-md p-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <Line data={lineChartData} options={lineChartOptions} />
                </motion.div>


                <motion.div
                    className="bg-white rounded-lg shadow-md p-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <Bar data={barChartData} options={barChartOptions} />
                </motion.div>
            </div>
        </div>
    );
}
