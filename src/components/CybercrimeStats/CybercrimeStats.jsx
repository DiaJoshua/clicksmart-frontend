import { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import "./WarningModal.css";
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

const WarningModal = ({ onAcknowledge }) => {
  return (
    <div className="warning-modal-overlay">
      <div className="warning-modal">
        <h2>⚠️ Warning</h2>
        <p>
          This module presents{" "}
          <span className="highlight">Cybercrime Statistics</span> for
          districts 3 to 6 in Quezon City, visualized through{" "}
          <span className="highlight">Simplified Charts</span> and descriptions
          to provide a clearer understanding of the cybercrime landscape.
        </p>

        <p>
          The data is sourced directly from the{" "}
          <span className="highlight">Philippine National Police (PNP)</span>{" "}
          and is publicly available, ensuring{" "}
          <span className="highlight">Transparency and Accuracy</span>.
        </p>

        <p>
          We recognize that viewing crime statistics may be{" "}
          <span className="highlight">Sensitive</span> for some users. Our goal
          is to <span className="highlight">Inform</span> and{" "}
          <span className="highlight">Raise Awareness</span> about cybercrime
          trends in different areas,{" "}
          <span className="highlight">Not to cause Fear</span>.
        </p>

        <p>
          Before proceeding, please acknowledge that this data is intended for{" "}
          <span className="highlight">Informational Purposes Only</span> and
          should be interpreted with caution.
        </p>

        <p>
          By continuing, you confirm that you{" "}
          <span className="highlight">understand the nature</span> of this
          information and its public availability.
        </p>

        <button onClick={onAcknowledge}>I Acknowledge</button>
      </div>
    </div>
  );
};

const CybercrimeStats = () => {
  // States for district and year dataset data
  const [cybercrimeData, setCybercrimeData] = useState([]);
  const [loadingDistrict, setLoadingDistrict] = useState(true);
  const [errorDistrict, setErrorDistrict] = useState(null);

  const [yearData, setYearData] = useState([]);
  const [yearLoading, setYearLoading] = useState(true);
  const [yearError, setYearError] = useState(null);

  // Warning modal state
  const [acknowledged, setAcknowledged] = useState(false);

  // Modal state for full-view charts
  const [modalChart, setModalChart] = useState(null);

  // Filter state for searching data by case type keyword
  const [filterText, setFilterText] = useState("");

  // Tab state: "district" or "year"
  const [activeTab, setActiveTab] = useState("district");

  // --------------------- Fetch District Data ---------------------
  useEffect(() => {
    axios
      .get("https://clicksmart-backend.onrender.com/api/cases")
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
      .get("https://clicksmart-backend.onrender.com/yeardataset")
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

// --------------------- Render Loading and Error States ---------------------

if (loadingDistrict || yearLoading) {
  return (
    <div className="loading-container">
      <div className="spinner">
        <div className="spinner-dot"></div>
        <div className="spinner-dot"></div>
        <div className="spinner-dot"></div>
      </div>
      <p>Loading Cybercrime Data...</p>
    </div>
  );
}

if (errorDistrict || yearError) {
  return (
    <div className="error-container">
      <div className="error-icon">
        <span role="img" aria-label="error">❌</span>
      </div>
      <p className="error-message">
        <strong>Error:</strong> {errorDistrict || yearError}
      </p>
      <p>Something went wrong while fetching the data. Please try again later.</p>
    </div>
  );
}


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
      {/* Show Warning Modal if not acknowledged */}
      {!acknowledged ? (
        <WarningModal onAcknowledge={() => setAcknowledged(true)} />
      ) : (
        <>
          <div className="disclaimer">
            <p>
              <strong>Disclaimer:</strong> The data shown in this module is
              public information provided by the{" "}
              <span className="highlight">
                Philippine National Police (PNP)
              </span>
              . These statistics are for informational purposes only and aim to
              raise awareness about cybercrime trends. Interpret the data
              responsibly and use it with caution.
            </p>
          </div>
          <h1>Cybercrime Statistics: Insights on Quezon City</h1>

          {/* Tab Navigation & Filter Dropdown */}
          <div className="tabs-container">
            <div className="tabs">
              <div
                className={`tab ${activeTab === "district" ? "active" : ""}`}
                onClick={() => setActiveTab("district")}
              >
                District Data Overview
              </div>
              <div
                className={`tab ${activeTab === "year" ? "active" : ""}`}
                onClick={() => setActiveTab("year")}
              >
                Yearly Trends
              </div>
            </div>
            <div className="filter-container">
              <label htmlFor="filter-dropdown">Filter by Case Type: </label>
              <select
                id="filter-dropdown"
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                className="filter-dropdown"
              >
                <option value="">All Types</option>
                {/* Generate filter options dynamically */}
                {uniqueCases.map((caseType, index) => (
                  <option key={index} value={caseType}>
                    {caseType}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* --------------------- District Data Overview --------------------- */}
          {activeTab === "district" && (
            <>
              {loadingDistrict ? (
                <p>Loading data... Please wait.</p>
              ) : errorDistrict ? (
                <p>{errorDistrict}</p>
              ) : (
                <>
                  <div
                    className="chart-container"
                    onClick={() =>
                      openModal(
                        "Bar",
                        processBarangayData(),
                        "Cybercrime Cases by Barangay in Quezon City (District Data)",
                        "This bar chart shows the number of cybercrime cases across each barangay in Quezon City."
                      )
                    }
                  >
                    <h2>Cybercrime Cases by Barangay</h2>
                    <p className="chart-summary">
                      This bar chart provides a breakdown of cybercrime cases
                      across various barangays in Quezon City. Each bar
                      represents the total number of cybercrime incidents
                      reported in a specific area. By examining this chart, you
                      can identify which barangays have the highest reported
                      cases and assess the potential need for targeted
                      interventions in those areas.
                    </p>
                    <Bar
                      data={processBarangayData()}
                      options={{ responsive: true }}
                    />
                    <p className="chart-description">
                      Click to explore the detailed data for each barangay.
                    </p>
                  </div>

                  <div
                    className="chart-container"
                    onClick={() =>
                      openModal(
                        "Pie",
                        processCrimeTypeData(),
                        "Distribution of Cybercrime Types in Quezon City",
                        "This pie chart illustrates the distribution of different cybercrime types in Quezon City."
                      )
                    }
                  >
                    <h2>Crime Type Distribution</h2>
                    <p className="chart-summary">
                      This pie chart illustrates the distribution of different
                      types of cybercrimes reported in Quezon City. It breaks
                      down the total number of cases into categories such as
                      hacking, online fraud, and identity theft. This chart
                      helps visualize the prevalence of each cybercrime type,
                      enabling a clearer understanding of the risks the
                      community faces.
                    </p>
                    <Pie
                      data={processCrimeTypeData()}
                      options={{ responsive: true }}
                    />
                    <p className="chart-description">
                      Click for a detailed view of each crime type Distribution.
                    </p>
                  </div>
                </>
              )}
            </>
          )}

          {/* --------------------- Yearly Trends --------------------- */}
          {activeTab === "year" && (
            <>
              {yearLoading ? (
                <p>Loading yearly trends... Please wait.</p>
              ) : yearError ? (
                <p>{yearError}</p>
              ) : (
                <>
                  <div
                    className="chart-container"
                    onClick={() =>
                      openModal(
                        "Bar",
                        processYearDatasetQuarterly(),
                        "Quarterly Cybercrime Cases Comparison",
                        "This chart compares the number of cybercrime cases in the 4th Quarter of 2023 versus the 1st Quarter of 2024."
                      )
                    }
                  >
                    <h2>Quarterly Comparison: Cybercrime Cases</h2>
                    <p className="chart-summary">
                      This bar chart compares the number of cybercrime cases
                      reported in the 4th Quarter of 2023 and the 1st Quarter of
                      2024. It provides insight into seasonal trends, allowing
                      us to track any significant increases or decreases in
                      cybercrime activity. Analyzing these trends can help
                      identify potential causes behind spikes in cybercrime
                      cases.
                    </p>
                    <Bar
                      data={processYearDatasetQuarterly()}
                      options={{ responsive: true }}
                    />
                    <p className="chart-description">
                      Click to see how cases have changed across quarters.
                    </p>
                  </div>

                  <div
                    className="chart-container"
                    onClick={() =>
                      openModal(
                        "Bar",
                        processYearDatasetPercentage(),
                        "Percentage Increase in Cybercrime Cases",
                        "This bar chart shows the percentage change in cybercrime cases from the 4th Quarter of 2023 to the 1st Quarter of 2024."
                      )
                    }
                  >
                    <h2>Percentage Change in Cases</h2>
                    <p className="chart-summary">
                      This bar chart highlights the percentage increase in
                      cybercrime cases from the 4th Quarter of 2023 to the 1st
                      Quarter of 2024. This data shows how rapidly the number of
                      reported cases has grown, which could be useful for
                      understanding the effectiveness of crime prevention
                      strategies or identifying new patterns in cybercrime
                      behavior.
                    </p>
                    <Bar
                      data={processYearDatasetPercentage()}
                      options={{ responsive: true }}
                    />
                    <p className="chart-description">
                      Click to explore the percentage increase across cases.
                    </p>
                  </div>

                  <div
                    className="chart-container"
                    onClick={() =>
                      openModal(
                        "Line",
                        processCombinedYearTrend(),
                        "Cybercrime Trend Overview",
                        "This line chart combines data from both quarters to show the overall trend in cybercrime cases."
                      )
                    }
                  >
                    <h2>Combined Trend of Cybercrime Cases</h2>
                    <p className="chart-summary">
                      This line chart provides a comprehensive view of
                      cybercrime trends, combining data from both the 4th
                      Quarter of 2023 and the 1st Quarter of 2024. It shows how
                      cybercrime activity has evolved over time, allowing you to
                      track longer-term trends and assess the impact of various
                      interventions.
                    </p>
                    <Line
                      data={processCombinedYearTrend()}
                      options={{ responsive: true }}
                    />
                    <p className="chart-description">
                      Click to see how the overall trend evolves over time.
                    </p>
                  </div>
                </>
              )}
            </>
          )}

          {/* --------------------- Modal for Full-Viewport Chart --------------------- */}
          {modalChart && (
            <div className="modal-overlay" onClick={closeModal}>
              <div
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
              >
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
        </>
      )}
    </div>
  );
};

// Prop validation for the component
WarningModal.propTypes = {
  onAcknowledge: PropTypes.func.isRequired,
};

export default CybercrimeStats;
