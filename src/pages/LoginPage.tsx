import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Heart, LogIn, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const { login } = useApp();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !role) {
      setError('Please select a role and enter your email');
      return;
    }
    const success = login(email, role);
    if (success) {
      navigate('/dashboard');
    } else {
      setError('Invalid credentials. Please check the demo accounts below.');
    }
  };

  const demoAccounts = [
    { role: 'manager', email: 'sarah@acmecorp.com', name: 'Sarah Johnson (Manager)' },
    { role: 'employee', email: 'james@acmecorp.com', name: 'James Wilson (Employee)' },
    { role: 'doctor', email: 'emily@occuphealth.com', name: 'Dr. Emily Roberts (Doctor)' },
  ];

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-gray-50 to-teal-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center bg-gradient-to-br from-teal-500 to-blue-600 p-3 rounded-xl mb-4">
            <Heart className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Portal Login</h1>
          <p className="text-gray-600 mt-2">Access your occupational health portal</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Your Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
              >
                <option value="">Select your role...</option>
                <option value="manager">Manager</option>
                <option value="employee">Employee</option>
                <option value="doctor">Doctor</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-600 bg-red-50 px-4 py-3 rounded-lg text-sm">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors flex items-center justify-center gap-2"
            >
              <LogIn className="h-4 w-4" /> Sign In
            </button>
          </form>
        </div>

        {/* Demo Accounts */}
        <div className="mt-8 bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-3 text-sm">Demo Accounts (click to autofill)</h3>
          <div className="space-y-2">
            {demoAccounts.map((account, i) => (
              <button
                key={i}
                onClick={() => { setEmail(account.email); setRole(account.role); }}
                className="w-full text-left px-4 py-3 bg-gray-50 rounded-lg hover:bg-teal-50 hover:border-teal-200 border border-gray-100 transition-colors"
              >
                <div className="text-sm font-medium text-gray-800">{account.name}</div>
                <div className="text-xs text-gray-500">{account.email}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
