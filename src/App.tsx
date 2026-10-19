import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import BookingPage from './pages/BookingPage';
import DashboardPage from './pages/DashboardPage';
import ReferralsPage from './pages/ReferralsPage';
import ConsentPage from './pages/ConsentPage';
import ReportsPage from './pages/ReportsPage';
import ServicesPage from './pages/ServicesPage';
import BookingsListPage from './pages/BookingsListPage';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-gray-50">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/bookings" element={<BookingPage />} />
              <Route path="/bookings/list" element={<BookingsListPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/referrals" element={<ReferralsPage />} />
              <Route path="/consent" element={<ConsentPage />} />
              <Route path="/reports" element={<ReportsPage />} />
              <Route path="/services" element={<ServicesPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
