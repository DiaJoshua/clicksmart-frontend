import React, { useEffect, useState } from "react";
import axios from "axios";
import Chatbot from "../Chatbot/Chatbot";
import { Bar, Line, Pie, Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
  PointElement,
  LineElement,
  ArcElement,
  RadialLinearScale,
} from "chart.js";
import "./CybercrimeStats.css";

// Register Chart.js components
ChartJS.register(
  BarElement,
  CategoryScale,
  RadialLinearScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
  PointElement,
  LineElement,
  ArcElement
);

const CybercrimeStats = () => {
  const [cybercrimeData, setCybercrimeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/cybercrime-stats") // Ensure this matches backend
      .then((response) => {
        console.log("Data received:", response.data);
        setCybercrimeData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("There was an error fetching the data.");
        setLoading(false);
      });
}, []);


  if (loading) {
    return <div>Loading...</div>;
  }

  // 🟢 Process barangay-level data
  const processBarangayData = () => {
    let barangayCases = {};

    cybercrimeData.forEach((record) => {
      Object.entries(record.Brgy || {}).forEach(([barangay, cases]) => {
        if (typeof cases === "object") {
          Object.entries(cases).forEach(([subBrgy, subCases]) => {
            barangayCases[subBrgy] = (barangayCases[subBrgy] || 0) + subCases;
          });
        } else {
          barangayCases[barangay] = (barangayCases[barangay] || 0) + cases;
        }
      });
    });

    return {
      labels: Object.keys(barangayCases),
      datasets: [
        {
          label: "Cybercrime Cases per Barangay",
          data: Object.values(barangayCases),
          backgroundColor: "rgba(75,192,192,0.6)",
          borderColor: "rgba(75,192,192,1)",
          borderWidth: 1,
        },
      ],
    };
  };

  // 🟢 Process quarterly trend data
  const processQuarterlyData = () => {
    const quarterlyTrends = {
      "4th Quarter of 2023": 0,
      "1st Quarter of 2024": 0,
    };

    cybercrimeData.forEach((record) => {
      if (record["4th Quarter of 2023"]) {
        quarterlyTrends["4th Quarter of 2023"] += record["4th Quarter of 2023"];
      }
      if (record["1st Quarter of 2024"]) {
        quarterlyTrends["1st Quarter of 2024"] += record["1st Quarter of 2024"];
      }
    });

    return {
      labels: Object.keys(quarterlyTrends),
      datasets: [
        {
          label: "Cybercrime Cases Over Time",
          data: Object.values(quarterlyTrends),
          backgroundColor: "rgba(255,99,132,0.6)",
          borderColor: "rgba(255,99,132,1)",
          borderWidth: 2,
          fill: false,
        },
      ],
    };
  };

  // 🟢 Process Crime Type Data (Pie Chart)
  const processCrimeTypeData = () => {
    let crimeTypes = {
      Fraud: 0,
      Hacking: 0,
      Phishing: 0,
      IdentityTheft: 0,
      Others: 0,
    };

    cybercrimeData.forEach((record) => {
      if (record.CrimeType) {
        record.CrimeType.forEach((type) => {
          crimeTypes[type] = (crimeTypes[type] || 0) + 1;
        });
      }
    });

    return {
      labels: Object.keys(crimeTypes),
      datasets: [
        {
          label: "Crime Type Distribution",
          data: Object.values(crimeTypes),
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(75, 192, 192, 0.6)",
            "rgba(153, 102, 255, 0.6)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };
  };

  // 🟢 Process Monthly Data for Radar Chart (Trends in months of 2024)
  const processMonthlyData = () => {
    const monthlyTrends = {
      January: 0,
      February: 0,
      March: 0,
      April: 0,
      May: 0,
      June: 0,
      July: 0,
      August: 0,
      September: 0,
      October: 0,
      November: 0,
      December: 0,
    };

    cybercrimeData.forEach((record) => {
      Object.entries(record.MonthlyData || {}).forEach(([month, cases]) => {
        if (monthlyTrends[month] !== undefined) {
          monthlyTrends[month] += cases;
        }
      });
    });

    return {
      labels: Object.keys(monthlyTrends),
      datasets: [
        {
          label: "Cybercrime Trend by Month in 2024",
          data: Object.values(monthlyTrends),
          backgroundColor: "rgba(153, 102, 255, 0.2)",
          borderColor: "rgba(153, 102, 255, 1)",
          borderWidth: 2,
          pointBackgroundColor: "rgba(153, 102, 255, 1)",
        },
      ],
    };
  };

  return (
    <div className="cybercrime-container">
      <h1>Cybercrime Statistics</h1>

      <div className="chart-container">
        <h2>Cybercrime Cases by Barangay</h2>
        <Bar data={processBarangayData()} options={{ responsive: true }} />
      </div>

      <div className="chart-container">
        <h2>Quarterly Cybercrime Trends</h2>
        <Line data={processQuarterlyData()} options={{ responsive: true }} />
      </div>

      <div className="chart-container">
        <h2>Crime Type Distribution</h2>
        <Pie data={processCrimeTypeData()} options={{ responsive: true }} />
      </div>

      <div className="chart-container">
        <h2>Monthly Cybercrime Trends (2024)</h2>
        <Radar data={processMonthlyData()} options={{ responsive: true }} />
      </div>

      {/* Chatbot */}
    <Chatbot />
    </div>
  );
};

export default CybercrimeStats;
