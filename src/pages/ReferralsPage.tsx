import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { Plus, Users, Search, AlertCircle, CheckCircle } from 'lucide-react';

export default function ReferralsPage() {
  const { currentUser, referrals, addReferral, users, updateReferralStatus } = useApp();
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState('');
  const [formData, setFormData] = useState({
    employeeId: '',
    reason: '',
    urgency: 'medium' as 'low' | 'medium' | 'high',
    notes: '',
  });
  const [submitted, setSubmitted] = useState(false);

  if (!currentUser || currentUser.role !== 'manager') {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-4">Only managers can access the referrals page.</p>
          <button onClick={() => navigate('/dashboard')} className="bg-teal-600 text-white px-6 py-2 rounded-lg font-medium">
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const myReferrals = referrals.filter(r => r.managerId === currentUser.id);
  const filteredReferrals = myReferrals.filter(r =>
    r.employeeName.toLowerCase().includes(search.toLowerCase()) ||
    r.reason.toLowerCase().includes(search.toLowerCase())
  );
  const employees = users.filter(u => u.role === 'employee');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const employee = users.find(u => u.id === formData.employeeId);
    addReferral({
      id: `r${Date.now()}`,
      managerId: currentUser.id,
      managerName: currentUser.name,
      employeeId: formData.employeeId,
      employeeName: employee?.name || '',
      reason: formData.reason,
      urgency: formData.urgency,
      date: new Date().toISOString().split('T')[0],
      status: 'pending',
      notes: formData.notes,
    });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setShowForm(false);
      setFormData({ employeeId: '', reason: '', urgency: 'medium', notes: '' });
    }, 2000);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Employee Referrals</h1>
            <p className="text-gray-600">Refer employees for occupational health assessments</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-teal-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-teal-700 flex items-center gap-2"
          >
            <Plus className="h-4 w-4" /> New Referral
          </button>
        </div>

        {/* New Referral Form */}
        {showForm && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
            {submitted ? (
              <div className="text-center py-6">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-gray-800">Referral Submitted!</h3>
                <p className="text-gray-600 text-sm">The employee will be contacted to schedule an appointment.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Users className="h-5 w-5 text-teal-600" /> New Employee Referral
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Employee</label>
                    <select
                      value={formData.employeeId}
                      onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                      required
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                    >
                      <option value="">Select employee...</option>
                      {employees.map(emp => (
                        <option key={emp.id} value={emp.id}>{emp.name} ({emp.department})</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Urgency</label>
                    <select
                      value={formData.urgency}
                      onChange={(e) => setFormData({ ...formData, urgency: e.target.value as 'low' | 'medium' | 'high' })}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                    >
                      <option value="low">Low - Routine Assessment</option>
                      <option value="medium">Medium - Within 2 Weeks</option>
                      <option value="high">High - Urgent</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Reason for Referral</label>
                  <textarea
                    value={formData.reason}
                    onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                    required
                    rows={2}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none resize-none"
                    placeholder="Describe the reason for referral..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes (optional)</label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    rows={2}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none resize-none"
                    placeholder="Any additional context..."
                  />
                </div>
                <div className="flex gap-3">
                  <button type="submit" className="bg-teal-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-teal-700">
                    Submit Referral
                  </button>
                  <button type="button" onClick={() => setShowForm(false)} className="text-gray-600 px-6 py-2.5 rounded-lg font-medium hover:bg-gray-100">
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search referrals..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
          />
        </div>

        {/* Referrals List */}
        <div className="space-y-3">
          {filteredReferrals.map(referral => (
            <div key={referral.id} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-gray-800">{referral.employeeName}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      referral.urgency === 'high' ? 'bg-red-100 text-red-700' :
                      referral.urgency === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {referral.urgency} urgency
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${
                      referral.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                      referral.status === 'accepted' ? 'bg-blue-100 text-blue-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {referral.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{referral.reason}</p>
                  {referral.notes && <p className="text-xs text-gray-500">Note: {referral.notes}</p>}
                  <p className="text-xs text-gray-400 mt-2">Referred on {referral.date}</p>
                </div>
                {referral.status === 'pending' && (
                  <button
                    onClick={() => updateReferralStatus(referral.id, 'accepted')}
                    className="text-xs bg-teal-50 text-teal-700 px-3 py-1.5 rounded-lg hover:bg-teal-100 font-medium"
                  >
                    Mark Accepted
                  </button>
                )}
              </div>
            </div>
          ))}
          {filteredReferrals.length === 0 && (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
              <Users className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No referrals found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
