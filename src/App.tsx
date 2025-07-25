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
import EmployerLogin from './pages/EmployerLogin';
import EmployerDashboard from './pages/EmployerDashboard';
import EmployerForm from './pages/EmployerForm';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Routes>
          {/* Public routes with header/footer */}
          <Route path="/" element={
            <>
              <Header />
              <main className="flex-grow">
                <Home />
              </main>
              <Footer />
            </>
          } />
          <Route path="/services" element={
            <>
              <Header />
              <main className="flex-grow">
                <Services />
              </main>
              <Footer />
            </>
          } />
          <Route path="/staffing-expertises" element={
            <>
              <Header />
              <main className="flex-grow">
                <StaffingExpertises />
              </main>
              <Footer />
            </>
          } />
          <Route path="/employee" element={
            <>
              <Header />
              <main className="flex-grow">
                <Employee />
              </main>
              <Footer />
            </>
          } />
          <Route path="/contact" element={
            <>
              <Header />
              <main className="flex-grow">
                <Contact />
              </main>
              <Footer />
            </>
          } />
          <Route path="/employer" element={
            <>
              <Header />
              <main className="flex-grow">
                <Employer />
              </main>
              <Footer />
            </>
          } />
          
          {/* Employer authentication and dashboard routes */}
          <Route path="/employer-login" element={<EmployerLogin />} />
          <Route path="/employer-dashboard" element={<EmployerDashboard />} />
          <Route path="/employer-form" element={<EmployerForm />} />
          <Route path="/employer-form/:id" element={<EmployerForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;