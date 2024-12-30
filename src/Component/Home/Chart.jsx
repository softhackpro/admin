import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const OrderStatistics = () => {
  const data = {
    labels: ["January", "February", "March", "April"],
    datasets: [
      {
        label: "Orders",
        data: [12, 19, 3, 5],
        borderColor: "#28a745", // Green color for Orders
        fill: false,
        tension: 0.1,
      },
      {
        label: "Return",
        data: [5, 10, 15, 20],
        borderColor: "red", // Red color for Returns
        fill: false,
        tension: 0.1,
      },
      {
        label: "Users",
        data: [10, 15, 12, 20],
        borderColor: "blue", // Blue color for Users
        fill: false,
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="col-lg-8">
      <div className="card">
        <div className="card-body">
          <h5>Order Statistics</h5>
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default OrderStatistics;
