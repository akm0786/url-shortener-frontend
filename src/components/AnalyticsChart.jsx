import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AnalyticsChart = ({ urls }) => {
  // 1. Data Transformation: Get top 5 or 10 links by clicks
  const sortedUrls = [...urls].sort((a, b) => b.clicks - a.clicks).slice(0, 7);

  const data = {
    labels: sortedUrls.map(url => `/${url.shortCode}`),
    datasets: [
      {
        label: 'Clicks',
        data: sortedUrls.map(url => url.clicks),
        backgroundColor: 'rgba(37, 99, 235, 0.8)', // Modern Blue
        borderRadius: 8,
        hoverBackgroundColor: 'rgba(37, 99, 235, 1)',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Hide legend for a cleaner "SaaS" look
      },
      tooltip: {
        backgroundColor: '#1e293b',
        padding: 12,
        cornerRadius: 8,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1 },
        grid: {
          drawBorder: false,
          color: 'rgba(0, 0, 0, 0.05)',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm h-[350px]">
      <h3 className="text-lg font-bold text-gray-800 mb-6">Link Performance</h3>
      <div className="h-[250px]">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default AnalyticsChart;