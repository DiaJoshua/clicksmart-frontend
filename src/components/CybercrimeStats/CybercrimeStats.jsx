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
      .get("http://localhost:5000/api/cases")
      .then((response) => {
        console.log("Data received:", response.data);
  
        if (!Array.isArray(response.data)) {
          console.error("API response is not an array:", response.data);
          setError("Invalid API response format.");
          setLoading(false);
          return;
        }
  
        // Process each record
        const formattedData = response.data.map(record => {
          let barangayData = {};
  
          // Extract barangay cases dynamically (ignoring `_id`, `district`, and `NATURE OF CASES`)
          Object.entries(record).forEach(([key, value]) => {
            if (key.startsWith("Brgy.") && value !== null) {
              barangayData[key] = value;
            }
          });
  
          return {
            district: record.district || "Unknown",
            nature_of_cases: record["NATURE OF CASES"] || "Unknown",
            barangayData: barangayData,
            total_cases: record["TOTAL CASES PER CYBERCRIME"] || 0
          };
        });
  
        console.log("Formatted data:", formattedData);
        setCybercrimeData(formattedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("There was an error fetching the data.");
        setLoading(false);
      });
  }, []);
  
  

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="cyber-shield"></div>
        <h1 className="glitch-text">Loading Cybercrime Data...</h1>
      </div>
    );
  }

  
  if (error) {
    return (
      <div className="error-screen">
        <div className="error-icon">⚠️</div>
        <h1 className="glitch-text">Error Loading Data</h1>
        <p>{error}</p>
        <button onClick={() => window.location.reload()} className="retry-button">Retry</button>
      </div>
    );
  }


  // 🟢 Process barangay-level data
  const processBarangayData = () => {
    let barangayCases = {};
  
    cybercrimeData.forEach((record) => {
      Object.entries(record.barangayData || {}).forEach(([barangay, cases]) => {
        if (!isNaN(cases)) {
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
    let crimeTypes = {};
  
    cybercrimeData.forEach((record) => {
      let crimeType = record.nature_of_cases ? record.nature_of_cases.trim().toUpperCase() : null;
  
      // 🛑 Exclude "TOTAL CASES", "TOTAL CASES PER BARANGAY", and "UNKNOWN"
      if (crimeType && !crimeType.includes("TOTAL CASES") && crimeType !== "UNKNOWN") {
        crimeTypes[crimeType] = (crimeTypes[crimeType] || 0) + 1;
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
