import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, Booking, Referral, Report, ConsentSetting } from '../types';
import { mockUsers, mockBookings, mockReferrals, mockReports, mockConsents } from '../data/mockData';

interface AppState {
  currentUser: User | null;
  users: User[];
  bookings: Booking[];
  referrals: Referral[];
  reports: Report[];
  consents: ConsentSetting[];
  login: (email: string, role: string) => boolean;
  logout: () => void;
  addBooking: (booking: Booking) => void;
  addReferral: (referral: Referral) => void;
  addReport: (report: Report) => void;
  updateConsent: (consent: ConsentSetting) => void;
  updateReport: (report: Report) => void;
  updateBookingStatus: (id: string, status: Booking['status']) => void;
  updateReferralStatus: (id: string, status: Referral['status']) => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users] = useState<User[]>(mockUsers);
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [referrals, setReferrals] = useState<Referral[]>(mockReferrals);
  const [reports, setReports] = useState<Report[]>(mockReports);
  const [consents, setConsents] = useState<ConsentSetting[]>(mockConsents);

  const login = (email: string, role: string): boolean => {
    const user = users.find(u => u.email === email && u.role === role);
    if (user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const logout = () => setCurrentUser(null);

  const addBooking = (booking: Booking) => setBookings(prev => [...prev, booking]);
  const addReferral = (referral: Referral) => setReferrals(prev => [...prev, referral]);
  const addReport = (report: Report) => setReports(prev => [...prev, report]);

  const updateConsent = (consent: ConsentSetting) => {
    setConsents(prev => prev.map(c => c.employeeId === consent.employeeId ? consent : { ...consent }));
  };

  const updateReport = (report: Report) => {
    setReports(prev => prev.map(r => r.id === report.id ? report : r));
  };

  const updateBookingStatus = (id: string, status: Booking['status']) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
  };

  const updateReferralStatus = (id: string, status: Referral['status']) => {
    setReferrals(prev => prev.map(r => r.id === id ? { ...r, status } : r));
  };

  return (
    <AppContext.Provider value={{
      currentUser, users, bookings, referrals, reports, consents,
      login, logout, addBooking, addReferral, addReport,
      updateConsent, updateReport, updateBookingStatus, updateReferralStatus,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
