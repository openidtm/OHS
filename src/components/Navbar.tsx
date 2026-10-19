import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Menu, X, Heart, LogOut, User } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser, logout } = useApp();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navLinks = currentUser
    ? [
        { path: '/dashboard', label: 'Dashboard' },
        ...(currentUser.role === 'manager' ? [{ path: '/referrals', label: 'Referrals' }] : []),
        ...(currentUser.role === 'doctor' ? [{ path: '/reports', label: 'Reports' }] : []),
        ...(currentUser.role === 'employee' ? [{ path: '/consent', label: 'My Consent' }] : []),
        { path: '/bookings/list', label: 'Appointments' },
        { path: '/bookings', label: 'New Booking' },
      ]
    : [
        { path: '/', label: 'Home' },
        { path: '/services', label: 'Services' },
        { path: '/bookings', label: 'Book Appointment' },
      ];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-gradient-to-br from-teal-500 to-blue-600 p-2 rounded-lg">
                <Heart className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl text-gray-800">OccupHealth<span className="text-teal-600">Pro</span></span>
            </Link>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? 'bg-teal-50 text-teal-700'
                    : 'text-gray-600 hover:text-teal-600 hover:bg-gray-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            {currentUser ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full">
                  <User className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">{currentUser.name}</span>
                  <span className="text-xs bg-teal-100 text-teal-700 px-2 py-0.5 rounded-full capitalize">{currentUser.role}</span>
                </div>
                <button
                  onClick={logout}
                  className="flex items-center gap-1 text-gray-500 hover:text-red-500 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-teal-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-teal-700 transition-colors"
              >
                Portal Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 p-2">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-sm font-medium ${
                  isActive(link.path) ? 'bg-teal-50 text-teal-700' : 'text-gray-600'
                }`}
              >
                {link.label}
              </Link>
            ))}
            {currentUser ? (
              <button onClick={() => { logout(); setIsOpen(false); }} className="block w-full text-left px-3 py-2 text-red-500 text-sm font-medium">
                Logout
              </button>
            ) : (
              <Link to="/login" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-teal-600 text-sm font-medium">
                Portal Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
