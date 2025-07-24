import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import StaffingExpertises from './pages/StaffingExpertises';
import Employee from './pages/Employee';
import Contact from './pages/Contact';
import Employer from './pages/Employer';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/staffing-expertises" element={<StaffingExpertises />} />
            <Route path="/employee" element={<Employee />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/employer" element={<Employer />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;