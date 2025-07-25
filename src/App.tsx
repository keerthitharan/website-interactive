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
import EmployeeLogin from './pages/EmployeeLogin';
import EmployeeDashboard from './pages/EmployeeDashboard';
import EmployeeForm from './pages/EmployeeForm';

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
          
          {/* Employee authentication and dashboard routes */}
          <Route path="/employee-login" element={<EmployeeLogin />} />
          <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
          <Route path="/employee-form" element={<EmployeeForm />} />
          <Route path="/employee-form/:id" element={<EmployeeForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;