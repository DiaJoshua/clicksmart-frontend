import { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation
import "./ResourcesHub.css";
import ThesisPDF from "../../assets/downloadables/clicksmart-thesis.pdf";

const ResourcesHub = () => {
  // State for the selected section (null means "welcome" state)
  const [selectedSection, setSelectedSection] = useState(null);
  const location = useLocation(); // Get the location object

  // Content data object (converted from your JS)
  const contentData = useMemo(() => ({
    "pnp-acg": {
      title: "PNP-ACG Branches",
      text: "Find Philippine National Police Anti-Cybercrime Group branches near you.",
      ncrBranches: [
        {
          name: "Quezon City District Anti-Cybercrime Team (QCDACT)",
          contact: "0968-873-5132 / 0927-142-9620",
          email:
            "operations.dact@gmail.com / qcpd.act2018@gmail.com / 2018dact@gmail.com",
          address:
            "Makadios Street, Corner Maginhawa, Brgy. Sikatuna Village, Quezon City",
        },
        {
          name: "Manila District Anti-Cybercrime Team (MDACT)",
          contact: "0995-973-2432 / 0968-875-1396",
          email: "mdact2022@gmail.com",
          address:
            "Ground Floor, Manila Police District HQ, UN Ave, Ermita, Manila",
        },
        {
          name: "Eastern District Anti-Cybercrime Team (EDACT)",
          contact: "0968-859-3183",
          email: "edact2020@gmail.com",
          address:
            "Romulo Building, Sta. Rosa Street, Brgy. Kapitolyo, Pasig City",
        },
        {
          name: "Northern District Anti-Cybercrime Team (NDACT)",
          contact: "+82-888811-15 local 2217 / +63 928 512 8074",
          email: "ndact.pnpacg@gmail.com",
          address:
            "Northern Police District HQ, Tanigue St, Cor Dagat-Dagatan Ave, Caloocan City",
        },
        {
          name: "Southern District Anti-Cybercrime Team (SDACT)",
          contact: "+63 956 344 0075 / +63 968-858-9836",
          email: "pnp.sdact@gmail.com",
          address: "2nd Floor, SPD Building, Fort Bonifacio, Taguig City",
        },
      ],
      regionalBranches: [
        {
          name: "PNP-ACG Region 1",
          address: "San Fernando, La Union",
          contact: "(072) 607-6586 / acgregion1@pnp.gov.ph",
        },
        {
          name: "PNP-ACG Region 2",
          address: "Tuguegarao City, Cagayan",
          contact: "(078) 304-1860 / acgregion2@pnp.gov.ph",
        },
        {
          name: "PNP-ACG Region 3",
          address: "Camp Olivas, Pampanga",
          contact: "(045) 963-7753 / acgregion3@pnp.gov.ph",
        },
        {
          name: "PNP-ACG Region 4A",
          address: "Calamba City, Laguna",
          contact: "(049) 545-2223 / acgregion4a@pnp.gov.ph",
        },
        {
          name: "PNP-ACG MIMAROPA",
          address: "Calapan City, Oriental Mindoro",
          contact: "(043) 288-2329 / acgregion4b@pnp.gov.ph",
        },
        {
          name: "PNP-ACG Region 5",
          address: "Legazpi City, Albay",
          contact: "(052) 742-8155 / acgregion5@pnp.gov.ph",
        },
        {
          name: "PNP-ACG Region 6",
          address: "Iloilo City, Iloilo",
          contact: "(033) 329-9955 / acgregion6@pnp.gov.ph",
        },
        {
          name: "PNP-ACG Region 7",
          address: "Cebu City, Cebu",
          contact: "(032) 254-7417 / acgregion7@pnp.gov.ph",
        },
        {
          name: "PNP-ACG Region 8",
          address: "Tacloban City, Leyte",
          contact: "(053) 832-0405 / acgregion8@pnp.gov.ph",
        },
        {
          name: "PNP-ACG Region 9",
          address: "Pagadian City, Zamboanga del Sur",
          contact: "(062) 215-3677 / acgregion9@pnp.gov.ph",
        },
        {
          name: "PNP-ACG Region 10",
          address: "Cagayan de Oro City, Misamis Oriental",
          contact: "(088) 857-2955 / acgregion10@pnp.gov.ph",
        },
        {
          name: "PNP-ACG Region 11",
          address: "Davao City, Davao del Sur",
          contact: "(082) 224-1625 / acgregion11@pnp.gov.ph",
        },
        {
          name: "PNP-ACG Region 12",
          address: "General Santos City, South Cotabato",
          contact: "(083) 552-9735 / acgregion12@pnp.gov.ph",
        },
        {
          name: "PNP-ACG CAR",
          address: "Baguio City, Benguet",
          contact: "(074) 422-5515 / acgcar@pnp.gov.ph",
        },
        {
          name: "PNP-ACG ARMM",
          address: "Cotabato City, Maguindanao",
          contact: "(064) 421-2552 / acgarmm@pnp.gov.ph",
        },
        {
          name: "PNP-ACG CARAGA",
          address: "Butuan City, Agusan del Norte",
          contact: "(085) 342-6177 / acgcaraga@pnp.gov.ph",
        },
      ],
      otherContacts: [
        {
          name: "NBI Cybercrime Division",
          contact: "(632) 8523-8231",
          email: "ccd@nbi.gov.ph",
          address:
            "NBI Headquarters, 3rd Floor, JDC Center Building, No. 571 Engracia Cruz-Reyes Street, Ermita, Manila, Philippines 1000",
        },
        {
          name: "DOJ Office of Cybercrime",
          contact: "(632) 8523-8481",
          email: "cybercrime@doj.gov.ph",
          address: "DOJ Main Building, Padre Faura St, Ermita, Manila",
        },
        {
          name: "CICC (Cybercrime Investigation & Coordination Center)",
          contact: "1326",
          email: "complaints@cicc.gov.ph",
          address: "DICT Complex, C.P. Garcia Avenue, Diliman, Quezon City",
        },
        {
          name: "National Privacy Commission (NPC)",
          contact: "(632) 8234-2228",
          email: "info@privacy.gov.ph",
          address: "5th Floor, Delegation Building, PICC Complex, Pasay City",
        },
        {
          name: "DICT Cybersecurity Bureau",
          contact: "(632) 8920-0101",
          email: "cybersecurity@dict.gov.ph",
          address: "DICT Central Office, C.P. Garcia Ave, Diliman, Quezon City",
        },
      ],
    },

    devcontacts: {
      title: "The Developer Team Contacts",
      text: "For support or collaboration, contact the development team.",
      members: [
        {
          name: "Hanst Diether B. Abalos",
          role: "Project Manager / Researcher",
          email: "abaloshb@students.national-u.edu.ph",
        },
        {
          name: "John Russell M. Castillo",
          role: "AI Chatbot Model Developer",
          email: "castillojm@students.national-u.edu.ph",
        },
        {
          name: "Joshua M. Dia",
          role: "Frontend / Backend Developer",
          email: "diajm@students.national-u.edu.ph",
        },
        {
          name: "Farrah V. Montalban",
          role: "Main UI/UX Designer",
          email: "montalbanfv@students.national-u.edu.ph",
        },
        {
          name: "Vlademer Zane A. So",
          role: "Main Frontend Developer / Designer",
          email: "sova@students.national-u.edu.ph",
        },
      ],
    },

    offline: {
      title: "Downloadable Materials",
      text: "Access and download offline resources here.",
      files: [
        {
          name: "Cybercrime Awareness Infographic",
          url: "",
        },
        {
          name: "ClickSmart Research Thesis",
          url: ThesisPDF,
        },
      ],
    },

    projects: {
      title: "Cybercrime Prevention Projects",
      text: "This section is still under development.",
    },
  }), []); 

  // On mount, check if the URL has a hash (e.g., #pnp-acg)
  useEffect(() => {
    const section = location.hash.substring(1); // get hash without '#'
    if (section && contentData[section]) {
      setSelectedSection(section);
      // Scroll after a short delay to ensure the element is rendered:
      setTimeout(() => {
        const element = document.getElementById(section);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  }, [location]);

  // Handler for sidebar button clicks
  const handleSectionClick = (key) => {
    setSelectedSection(key);
    window.history.pushState(null, "", `#${key}`);
  };

  // Render the main content based on the selected section
  const renderContent = () => {
    if (!selectedSection) {
      return (
        <>
          <h2 id="content-title">Welcome to the Resource Hub</h2>
          <p id="content-text">
            Select a section from the side-menu to view the details.
          </p>
        </>
      );
    }

    const selectedContent = contentData[selectedSection];

    return (
      <>
        <h2 id="content-title">{selectedContent.title}</h2>
        <p id="content-text">{selectedContent.text}</p>
        <div id="dynamic-content">
          {/* For Developer Team */}
          {selectedContent.members && (
            <div className="contact-list">
              <h3>Meet the Development Team</h3>
              <hr />
              <div className="ncr-contact-grid">
                {selectedContent.members.map((member) => (
                  <div className="contact-item" key={member.email}>
                    <h4>{member.name}</h4>
                    <p>
                      <strong>Role:</strong> {member.role}
                    </p>
                    <p>
                      <strong>Email:</strong>{" "}
                      <a href={`mailto:${member.email}`} className="email-link">
                        {member.email}
                      </a>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* For PNP-ACG Branches (NCR) */}
          {selectedContent.ncrBranches && (
            <>
              <div className="contact-list">
                <h3>PNP-ACG Contact List (NCR)</h3>
                <hr />
                <div className="ncr-contact-grid">
                  {selectedContent.ncrBranches.map((branch, index) => (
                    <div className="contact-item" key={index}>
                      <h4>{branch.name}</h4>
                      <p>
                        <strong>Contact:</strong> {branch.contact}
                      </p>
                      <p>
                        <strong>Email:</strong> {branch.email}
                      </p>
                      <p>
                        <strong>Address:</strong> {branch.address}
                      </p>
                    </div>
                  ))}
                </div>
                <p className="source-link">
                  Source:{" "}
                  <a
                    href="https://acg.pnp.gov.ph/contact-us/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    PNP-ACG Official Website
                  </a>
                </p>
              </div>
              <hr />
            </>
          )}

          {/* For Regional Branches */}
          {selectedContent.regionalBranches && (
            <>
              <div className="contact-list">
                <h3>PNP-ACG Regional Contact List</h3>
                <hr />
                <div className="ncr-contact-grid">
                  {selectedContent.regionalBranches.map((branch, index) => (
                    <div className="contact-item" key={index}>
                      <h4>{branch.name}</h4>
                      <p>
                        <strong>Address:</strong> {branch.address}
                      </p>
                      <p>
                        <strong>Contact:</strong> {branch.contact}
                      </p>
                    </div>
                  ))}
                </div>
                <p className="source-link">
                  Source:{" "}
                  <a
                    href="https://acg.pnp.gov.ph/contact-us/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    PNP-ACG Official Website
                  </a>
                </p>
              </div>
              <hr />
            </>
          )}

          {/* For Other Cybercrime-Related Agencies */}
          {selectedContent.otherContacts && (
            <>
              <div className="contact-list">
                <h3>Other Cybercrime-Related Agencies in the Philippines</h3>
                <hr />
                <div className="ncr-contact-grid">
                  {selectedContent.otherContacts.map((agency, index) => (
                    <div className="contact-item" key={index}>
                      <h4>{agency.name}</h4>
                      <p>
                        <strong>Contact:</strong> {agency.contact}
                      </p>
                      <p>
                        <strong>Email:</strong> {agency.email}
                      </p>
                      <p>
                        <strong>Address:</strong> {agency.address}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <hr />
            </>
          )}

          {/* For Offline Resources */}
          {selectedContent.files && (
            <>
              <ul className="file-list">
                {selectedContent.files.map((file, index) => (
                  <li key={index}>
                    <a
                      href={file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="download-link"
                    >
                      {file.name}
                    </a>
                  </li>
                ))}
              </ul>
              <hr />
            </>
          )}
        </div>
      </>
    );
  };

  return (
    <>
      {/* Main Content Container */}
      <div className="helpcenter-container">
        {/* Sidebar Menu */}
        <nav className="sidebar">
          <h3>Resource Hub</h3>
          <ul>
            <li>
              <button
                id="pnp-acg"
                className="menu-btn"
                onClick={() => handleSectionClick("pnp-acg")}
                data-content="pnp-acg"
              >
                PNP-ACG Branches
              </button>
            </li>
            <li>
              <button
                id="devcontacts"
                className="menu-btn"
                onClick={() => handleSectionClick("devcontacts")}
                data-content="devcontacts"
              >
                Developer Team Contacts
              </button>
            </li>
            <li>
              <button
                id="offline"
                className="menu-btn"
                onClick={() => handleSectionClick("offline")}
                data-content="offline"
              >
                Offline Resource
              </button>
            </li>
            <li>
              <button
                id="projects"
                className="menu-btn"
                onClick={() => handleSectionClick("projects")}
                data-content="projects"
              >
                Projects
              </button>
            </li>
          </ul>
        </nav>

        {/* Dynamic Content Area with ID matching the selected section */}
        <div
          className="content"
          id={selectedSection ? selectedSection : "welcome"}
        >
          {renderContent()}
        </div>
      </div>
    </>
  );
};

export default ResourcesHub;
