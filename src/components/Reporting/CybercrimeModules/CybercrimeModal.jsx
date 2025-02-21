// import React, { useState } from "react";

// const cybercrimes = {
//   scams: { title: "Online Scams", description: "Fraudulent schemes that trick people into financial loss." },
//   hacking: { title: "Hacking", description: "Unauthorized access to computer systems or networks." },
//   phishing: { title: "Phishing", description: "Fraudulent emails or messages designed to steal personal data." },
// };

// const CybercrimeModal = () => {
//   const [selectedCrime, setSelectedCrime] = useState(null);

//   return (
//     <div className="cybercrime-modal">
//       <h2>Select a Cybercrime to Learn More</h2>
//       <div className="modal-grid">
//         {Object.keys(cybercrimes).map((key) => (
//           <button key={key} onClick={() => setSelectedCrime(cybercrimes[key])}>
//             {cybercrimes[key].title}
//           </button>
//         ))}
//       </div>
//       {selectedCrime && (
//         <div className="modal-content">
//           <h3>{selectedCrime.title}</h3>
//           <p>{selectedCrime.description}</p>
//           <button onClick={() => setSelectedCrime(null)}>Close</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CybercrimeModal;
