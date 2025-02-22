import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import AssessmentForm from "./components/AssessmentForm/AssessmentForm";
import NewsArticles from "./components/NewsArticles/NewsArticles";
import About from "./components/About/About";
import Reporting from "./components/Reporting/Reporting";
import CybercrimeStats from "./components/CybercrimeStats/CybercrimeStats";
import ResourcesHub from "./components/ResourcesHub/ResourcesHub";
import Chatbot from "./components/Chatbot/Chatbot";

function App() {
  const location = useLocation(); // Now it works since App is inside <BrowserRouter>

  return (
    <>
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/AssessmentForm" element={<AssessmentForm />} />
        <Route path="/NewsArticles" element={<NewsArticles />} />
        <Route path="/About" element={<About />} />
        <Route path="/Reporting" element={<Reporting />} />
        <Route path="/CybercrimeStats" element={<CybercrimeStats />} />
        <Route path="/ResourcesHub" element={<ResourcesHub />} />
      </Routes>
      <Footer />
      {location.pathname !== "/AssessmentForm" && <Chatbot />}
    </>
  );
}

export default App;
