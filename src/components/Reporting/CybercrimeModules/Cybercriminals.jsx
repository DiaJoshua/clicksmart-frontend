// import { useState } from "react";

// const cybercriminalsData = [
//   { id: "hackers", title: "Hackers", description: "Individuals who gain unauthorized access to systems." },
//   { id: "scammers", title: "Scammers & Fraudsters", description: "Cybercriminals who deceive people for financial gain." },
//   { id: "extortionists", title: "Cyber Extortionists", description: "Criminals who demand money by threatening victims." },
// ];

// const Cybercriminals = () => {
//   const [activeId, setActiveId] = useState(null);

//   return (
//     <section className="cybercriminals container">
//       <h2>Types of Cybercriminals</h2>
//       <div className="cybercriminal-grid">
//         {cybercriminalsData.map((criminal) => (
//           <div
//             key={criminal.id}
//             className={`cybercriminal-card ${activeId === criminal.id ? "active" : ""}`}
//             onClick={() => setActiveId(activeId === criminal.id ? null : criminal.id)}
//           >
//             <h3>{criminal.title}</h3>
//             {activeId === criminal.id && <p>{criminal.description}</p>}
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default Cybercriminals;
