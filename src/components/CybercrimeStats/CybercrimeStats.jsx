import { useEffect, useState } from "react";
import axios from "axios";
import { Bar, Line, Pie } from "react-chartjs-2";
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
} from "chart.js";
import "./CybercrimeStats.css";

// Register Chart.js components (including ArcElement for Pie charts)
ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
  PointElement,
  LineElement,
  ArcElement
);

const CybercrimeStats = () => {
  // States for district and year dataset data
  const [cybercrimeData, setCybercrimeData] = useState([]);
  const [loadingDistrict, setLoadingDistrict] = useState(true);
  const [errorDistrict, setErrorDistrict] = useState(null);

  const [yearData, setYearData] = useState([]);
  const [yearLoading, setYearLoading] = useState(true);
  const [yearError, setYearError] = useState(null);

  // Modal state for full-view charts
  const [modalChart, setModalChart] = useState(null);

  // Filter state for searching data by case type keyword
  const [filterText, setFilterText] = useState("");

  // Tab state: "district" or "year"
  const [activeTab, setActiveTab] = useState("district");

  // --------------------- Fetch District Data ---------------------
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/cases")
      .then((response) => {
        console.log("District data received:", response.data);
        if (!Array.isArray(response.data)) {
          console.error("API response is not an array:", response.data);
          setErrorDistrict("Invalid API response format.");
          setLoadingDistrict(false);
          return;
        }
        // Format the district data:
        const formattedData = response.data.map((record) => {
          let barangayData = {};
          Object.entries(record).forEach(([key, value]) => {
            // Collect barangay keys (assuming they start with "Brgy.")
            if (key.startsWith("Brgy.") && value !== null) {
              barangayData[key] = value;
            }
          });
          return {
            district: record.district || "Unknown",
            nature_of_cases: record["NATURE OF CASES"] || "Unknown",
            barangayData: barangayData,
            total_cases: record["TOTAL CASES PER CYBERCRIME"] || 0,
            "4th Quarter of 2023": record["4th Quarter of 2023"],
            "1st Quarter of 2024": record["1st Quarter of 2024"],
          };
        });
        console.log("Formatted district data:", formattedData);
        setCybercrimeData(formattedData);
        setLoadingDistrict(false);
      })
      .catch((error) => {
        console.error("Error fetching district data:", error);
        setErrorDistrict("There was an error fetching the district data.");
        setLoadingDistrict(false);
      });
  }, []);

  // --------------------- Fetch Year Dataset Data ---------------------
  useEffect(() => {
    axios
      .get("http://localhost:5000/yeardataset")
      .then((response) => {
        console.log("Year Dataset received:", response.data);
        if (!Array.isArray(response.data)) {
          console.error(
            "Year dataset API response is not an array:",
            response.data
          );
          setYearError("Invalid Year dataset API response format.");
          setYearLoading(false);
          return;
        }
        // Filter out any incomplete records and format the data:
        const filteredData = response.data.filter(
          (item) =>
            item["Nature of Cybercrime Cases"] !== null &&
            item["4th Quarter of 2023"] !== null &&
            item["1st Quarter of 2024"] !== null
        );
        const formattedYearData = filteredData.map((item) => ({
          natureOfCybercrimeCases: item["Nature of Cybercrime Cases"],
          q4: Number(item["4th Quarter of 2023"]),
          q1: Number(item["1st Quarter of 2024"]),
          percentage: parseFloat(item["Percentage Increase"].replace("%", "")),
        }));
        setYearData(formattedYearData);
        setYearLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching Year dataset:", error);
        setYearError("Error fetching Year dataset");
        setYearLoading(false);
      });
  }, []);

  // --------------------- Filtering Data ---------------------
  const filteredDistrictData = cybercrimeData.filter((record) =>
    record.nature_of_cases.toLowerCase().includes(filterText.toLowerCase())
  );

  const filteredYearData = yearData.filter((item) =>
    item.natureOfCybercrimeCases
      .toLowerCase()
      .includes(filterText.toLowerCase())
  );

  // Compute unique case types for the dropdown filter
  const uniqueCases = Array.from(
    new Set([
      ...cybercrimeData.map((record) => record.nature_of_cases),
      ...yearData.map((item) => item.natureOfCybercrimeCases),
    ])
  ).filter((caseType) => {
    if (!caseType) return false;
    const upper = caseType.toUpperCase();
    return !upper.includes("UNKNOWN");
  });

  // --------------------- District-based Chart Processing ---------------------

  // Bar Chart: Aggregated Cybercrime Cases per Barangay (from district data)
  const processBarangayData = () => {
    let barangayCases = {};
    filteredDistrictData.forEach((record) => {
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
          label: "Cybercrime Cases per Barangay in Quezon City",
          data: Object.values(barangayCases),
          backgroundColor: "rgba(75,192,192,0.6)",
          borderColor: "rgba(75,192,192,1)",
          borderWidth: 1,
        },
      ],
    };
  };

  // Pie Chart: Distribution of Crime Types (from district data)
  const processCrimeTypeData = () => {
    let crimeTypes = {};
    filteredDistrictData.forEach((record) => {
      const crimeType = record.nature_of_cases
        ? record.nature_of_cases.trim().toUpperCase()
        : null;
      if (
        crimeType &&
        !crimeType.includes("TOTAL CASES") &&
        crimeType !== "UNKNOWN"
      ) {
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
            "rgba(255, 159, 64, 0.6)",
            "rgba(60, 179, 113, 0.6)",
            "rgba(219, 112, 147, 0.6)",
            "rgba(65, 105, 225, 0.6)",
            "rgba(255, 127, 80, 0.6)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
            "rgba(60, 179, 113, 1)",
            "rgba(219, 112, 147, 1)",
            "rgba(65, 105, 225, 1)",
            "rgba(255, 127, 80, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };
  };

  // --------------------- Year-based Chart Processing ---------------------

  // Bar Chart: Quarterly Cases Comparison (from year dataset)
  const processYearDatasetQuarterly = () => {
    if (filteredYearData.length === 0) return { labels: [], datasets: [] };
    const labels = filteredYearData.map((item) => item.natureOfCybercrimeCases);
    const q4Data = filteredYearData.map((item) => item.q4);
    const q1Data = filteredYearData.map((item) => item.q1);
    return {
      labels,
      datasets: [
        {
          label: "4th Quarter 2023",
          data: q4Data,
          backgroundColor: "rgba(54, 162, 235, 0.6)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
        {
          label: "1st Quarter 2024",
          data: q1Data,
          backgroundColor: "rgba(255, 206, 86, 0.6)",
          borderColor: "rgba(255, 206, 86, 1)",
          borderWidth: 1,
        },
      ],
    };
  };

  // Bar Chart: Percentage Increase (from year dataset)
  const processYearDatasetPercentage = () => {
    if (filteredYearData.length === 0) return { labels: [], datasets: [] };
    const labels = filteredYearData.map((item) => item.natureOfCybercrimeCases);
    const percentageData = filteredYearData.map((item) => item.percentage);
    return {
      labels,
      datasets: [
        {
          label: "Percentage Increase",
          data: percentageData,
          backgroundColor: "rgba(153, 102, 255, 0.6)",
          borderColor: "rgba(153, 102, 255, 1)",
          borderWidth: 1,
        },
      ],
    };
  };

  // Line Chart: Combined Trend (Quarterly Cases & Percentage Increase)
  const processCombinedYearTrend = () => {
    if (filteredYearData.length === 0) return { labels: [], datasets: [] };
    const labels = filteredYearData.map((item) => item.natureOfCybercrimeCases);
    const quarterlyData = processYearDatasetQuarterly().datasets;
    const percentageData = processYearDatasetPercentage().datasets[0].data;
    return {
      labels,
      datasets: [
        {
          label: "4th Quarter 2023",
          data: quarterlyData[0].data,
          borderColor: "rgba(54, 162, 235, 1)",
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          fill: false,
          tension: 0.1,
        },
        {
          label: "1st Quarter 2024",
          data: quarterlyData[1].data,
          borderColor: "rgba(255, 206, 86, 1)",
          backgroundColor: "rgba(255, 206, 86, 0.2)",
          fill: false,
          tension: 0.1,
        },
        {
          label: "Percentage Increase",
          data: percentageData,
          borderColor: "rgba(153, 102, 255, 1)",
          backgroundColor: "rgba(153, 102, 255, 0.2)",
          fill: false,
          tension: 0.1,
        },
      ],
    };
  };

  // --------------------- Modal Functions ---------------------
  const openModal = (chartType, chartData, title, description) => {
    setModalChart({ chartType, chartData, title, description });
  };
  const closeModal = () => {
    setModalChart(null);
  };

  // --------------------- Render Component ---------------------
  return (
    <div className="cybercrime-container">
      <h1>Cybercrime District & Year Dataset Statistics (Quezon City)</h1>

      {/* Tab Navigation & Filter Dropdown */}
      <div className="tabs-container">
        <div className="tabs">
          <div
            className={`tab ${activeTab === "district" ? "active" : ""}`}
            onClick={() => setActiveTab("district")}
          >
            District Data
          </div>
          <div
            className={`tab ${activeTab === "year" ? "active" : ""}`}
            onClick={() => setActiveTab("year")}
          >
            Year Dataset
          </div>
        </div>
        <div className="filter-container">
          <label htmlFor="filter-dropdown">Filter by Nature of Case: </label>
          <select
            id="filter-dropdown"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className="filter-dropdown"
          >
            <option value="">All Cases</option>
            {uniqueCases.map((caseType, index) => (
              <option key={index} value={caseType}>
                {caseType}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* --------------------- District Data Charts --------------------- */}
      {activeTab === "district" && (
        <>
          {loadingDistrict ? (
            <p>Loading District Data...</p>
          ) : errorDistrict ? (
            <p>{errorDistrict}</p>
          ) : (
            <>
              {/* Bar Chart: Barangay Cases */}
              <div
                className="chart-container"
                onClick={() =>
                  openModal(
                    "Bar",
                    processBarangayData(),
                    "Cybercrime Cases by Barangay in Quezon City (District Data)",
                    "This bar chart shows the aggregated number of cybercrime cases for each barangay in Quezon City based on district data. Click for full details."
                  )
                }
              >
                <h2>
                  Cybercrime Cases by Barangay in Quezon City (District Data)
                </h2>
                <Bar
                  data={processBarangayData()}
                  options={{ responsive: true }}
                />
                <p className="chart-description">Click to view full details</p>
              </div>

              {/* Pie Chart: Crime Type Distribution */}
              <div
                className="chart-container"
                onClick={() =>
                  openModal(
                    "Pie",
                    processCrimeTypeData(),
                    "Crime Type Distribution in Quezon City (District Data)",
                    "This pie chart displays the distribution of different cybercrime case types based on district data in Quezon City."
                  )
                }
              >
                <h2>Crime Type Distribution in Quezon City (District Data)</h2>
                <Pie
                  data={processCrimeTypeData()}
                  options={{ responsive: true }}
                />
                <p className="chart-description">Click to view full details</p>
              </div>
            </>
          )}
        </>
      )}

      {/* --------------------- Year Dataset Charts --------------------- */}
      {activeTab === "year" && (
        <>
          {yearLoading ? (
            <p>Loading Year Dataset...</p>
          ) : yearError ? (
            <p>{yearError}</p>
          ) : (
            <>
              {/* Bar Chart: Quarterly Cases Comparison */}
              <div
                className="chart-container"
                onClick={() =>
                  openModal(
                    "Bar",
                    processYearDatasetQuarterly(),
                    "Year Dataset: Quarterly Cases Comparison in Quezon City",
                    "This bar chart compares the number of cases from the 4th Quarter 2023 and the 1st Quarter 2024 for each type of cybercrime case in Quezon City."
                  )
                }
              >
                <h2>Year Dataset: Quarterly Cases Comparison in Quezon City</h2>
                <Bar
                  data={processYearDatasetQuarterly()}
                  options={{ responsive: true }}
                />
                <p className="chart-description">Click to view full details</p>
              </div>

              {/* Bar Chart: Percentage Increase */}
              <div
                className="chart-container"
                onClick={() =>
                  openModal(
                    "Bar",
                    processYearDatasetPercentage(),
                    "Year Dataset: Percentage Increase in Quezon City",
                    "This bar chart shows the percentage increase in cybercrime cases from the 4th Quarter 2023 to the 1st Quarter 2024 for each case type in Quezon City."
                  )
                }
              >
                <h2>Year Dataset: Percentage Increase in Quezon City</h2>
                <Bar
                  data={processYearDatasetPercentage()}
                  options={{ responsive: true }}
                />
                <p className="chart-description">Click to view full details</p>
              </div>

              {/* Line Chart: Combined Trend */}
              <div
                className="chart-container"
                onClick={() =>
                  openModal(
                    "Line",
                    processCombinedYearTrend(),
                    "Year Dataset: Combined Trend in Quezon City",
                    "This line chart combines quarterly case numbers and percentage increases to provide an overall trend for each cybercrime case type in Quezon City."
                  )
                }
              >
                <h2>Year Dataset: Combined Trend in Quezon City</h2>
                <Line
                  data={processCombinedYearTrend()}
                  options={{ responsive: true }}
                />
                <p className="chart-description">Click to view full details</p>
              </div>
            </>
          )}
        </>
      )}

      {/* --------------------- Modal for Full-Viewport Chart --------------------- */}
      {modalChart && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              Close
            </button>
            <h2>{modalChart.title}</h2>
            <p>{modalChart.description}</p>
            <div className="modal-chart">
              {modalChart.chartType === "Bar" && (
                <Bar
                  data={modalChart.chartData}
                  options={{ responsive: true, maintainAspectRatio: false }}
                />
              )}
              {modalChart.chartType === "Line" && (
                <Line
                  data={modalChart.chartData}
                  options={{ responsive: true, maintainAspectRatio: false }}
                />
              )}
              {modalChart.chartType === "Pie" && (
                <Pie
                  data={modalChart.chartData}
                  options={{ responsive: true, maintainAspectRatio: false }}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CybercrimeStats;
