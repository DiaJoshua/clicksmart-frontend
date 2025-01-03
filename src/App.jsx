import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar"
import Footer from "./components/Footer/Footer"
import Home from "./components/Home/Home"
import AssessmentForm from "./components/AssessmentForm/AssessmentForm"
import NewsArticles from "./components/NewsArticles/NewsArticles"
import About from "./components/About/About"
import Reporting from "./components/Reporting/Reporting"
import CybercrimeStatistics from "./components/CybercrimeStatistics/CybercrimeStatistics"

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/AssessmentForm" element={<AssessmentForm />} />
        <Route path="/NewsArticles" element={<NewsArticles />} />
        <Route path="/About" element={<About />} />
        <Route path="/Reporting" element={<Reporting />} />
        <Route path="/CybercrimeStatistics" element={<CybercrimeStatistics />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
