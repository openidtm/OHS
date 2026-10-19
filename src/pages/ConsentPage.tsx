import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { Shield, AlertCircle, CheckCircle, Info, Lock, Unlock } from 'lucide-react';

export default function ConsentPage() {
  const { currentUser, consents, updateConsent, reports } = useApp();
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);

  if (!currentUser || currentUser.role !== 'employee') {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-4">Only employees can manage consent settings.</p>
          <button onClick={() => navigate('/dashboard')} className="bg-teal-600 text-white px-6 py-2 rounded-lg font-medium">
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const myConsent = consents.find(c => c.employeeId === currentUser.id) || {
    employeeId: currentUser.id,
    shareWithManager: false,
    shareDetails: 'fitness-only' as const,
    updatedAt: new Date().toISOString().split('T')[0],
  };

  const [shareWithManager, setShareWithManager] = useState(myConsent.shareWithManager);
  const [shareDetails, setShareDetails] = useState(myConsent.shareDetails);

  const myReports = reports.filter(r => r.employeeId === currentUser.id);

  const handleSave = () => {
    updateConsent({
      employeeId: currentUser.id,
      shareWithManager,
      shareDetails,
      updatedAt: new Date().toISOString().split('T')[0],
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Shield className="h-6 w-6 text-teal-600" /> Consent Settings
          </h1>
          <p className="text-gray-600">Control how your health reports are shared with your manager</p>
        </div>

        {saved && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span className="text-green-800 font-medium">Consent settings updated successfully!</span>
          </div>
        )}

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-6">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-blue-600 mt-0.5 shrink-0" />
            <div>
              <h3 className="font-semibold text-blue-800 mb-1">About Consent Settings</h3>
              <p className="text-sm text-blue-700">
                Your consent determines what information from your occupational health reports is shared with your manager.
                You can change these settings at any time. Reports are always available to you in full.
              </p>
            </div>
          </div>
        </div>

        {/* Main Consent Toggle */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Share Reports with Manager</h2>
              <p className="text-sm text-gray-600">Allow your manager to receive copies of your health reports</p>
            </div>
            <button
              onClick={() => setShareWithManager(!shareWithManager)}
              className={`relative w-14 h-7 rounded-full transition-colors ${shareWithManager ? 'bg-teal-600' : 'bg-gray-300'}`}
            >
              <div className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform ${shareWithManager ? 'translate-x-7.5 left-0.5' : 'left-0.5'}`}
                style={{ transform: shareWithManager ? 'translateX(28px)' : 'translateX(0)' }}
              />
            </button>
          </div>

          {shareWithManager && (
            <div className="border-t pt-5">
              <h3 className="font-medium text-gray-800 mb-3">What to share:</h3>
              <div className="space-y-3">
                <label className={`flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-all ${
                  shareDetails === 'full' ? 'border-teal-500 bg-teal-50' : 'border-gray-200 hover:border-teal-300'
                }`}>
                  <input
                    type="radio"
                    name="shareDetails"
                    value="full"
                    checked={shareDetails === 'full'}
                    onChange={() => setShareDetails('full')}
                    className="mt-1"
                  />
                  <div>
                    <p className="font-medium text-gray-800 flex items-center gap-2">
                      <Unlock className="h-4 w-4 text-orange-500" /> Full Report
                    </p>
                    <p className="text-sm text-gray-600">Manager sees complete report including findings, recommendations, and fitness status</p>
                  </div>
                </label>

                <label className={`flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-all ${
                  shareDetails === 'summary' ? 'border-teal-500 bg-teal-50' : 'border-gray-200 hover:border-teal-300'
                }`}>
                  <input
                    type="radio"
                    name="shareDetails"
                    value="summary"
                    checked={shareDetails === 'summary'}
                    onChange={() => setShareDetails('summary')}
                    className="mt-1"
                  />
                  <div>
                    <p className="font-medium text-gray-800 flex items-center gap-2">
                      <Shield className="h-4 w-4 text-yellow-500" /> Summary Only
                    </p>
                    <p className="text-sm text-gray-600">Manager sees fitness status and general recommendations, but not detailed medical findings</p>
                  </div>
                </label>

                <label className={`flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-all ${
                  shareDetails === 'fitness-only' ? 'border-teal-500 bg-teal-50' : 'border-gray-200 hover:border-teal-300'
                }`}>
                  <input
                    type="radio"
                    name="shareDetails"
                    value="fitness-only"
                    checked={shareDetails === 'fitness-only'}
                    onChange={() => setShareDetails('fitness-only')}
                    className="mt-1"
                  />
                  <div>
                    <p className="font-medium text-gray-800 flex items-center gap-2">
                      <Lock className="h-4 w-4 text-green-500" /> Fitness Status Only
                    </p>
                    <p className="text-sm text-gray-600">Manager only sees whether you are fit/unfit for work, with no medical details</p>
                  </div>
                </label>
              </div>
            </div>
          )}

          {!shareWithManager && (
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <p className="text-sm text-gray-600 flex items-center gap-2">
                <Lock className="h-4 w-4 text-gray-400" />
                Reports will only be visible to you. Your manager will not receive any information from your health assessments.
              </p>
            </div>
          )}
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="bg-teal-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors"
          >
            Save Consent Settings
          </button>
        </div>

        {/* My Reports */}
        <div className="mt-8 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-800 mb-4">Your Health Reports</h3>
          {myReports.length > 0 ? (
            <div className="space-y-3">
              {myReports.map(report => (
                <div key={report.id} className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-800">{report.type}</h4>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      report.fitnessStatus === 'fit' ? 'bg-green-100 text-green-700' :
                      report.fitnessStatus === 'fit-with-restrictions' ? 'bg-yellow-100 text-yellow-700' :
                      report.fitnessStatus === 'unfit' ? 'bg-red-100 text-red-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {report.fitnessStatus === 'fit-with-restrictions' ? 'Fit (Restricted)' : report.fitnessStatus}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{report.doctorName} • {report.date}</p>
                  <div className="mt-3 text-sm">
                    <p className="font-medium text-gray-700 mb-1">Findings:</p>
                    <p className="text-gray-600">{report.findings}</p>
                    <p className="font-medium text-gray-700 mt-2 mb-1">Recommendations:</p>
                    <p className="text-gray-600 whitespace-pre-line">{report.recommendations}</p>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <span className={`text-xs px-2 py-0.5 rounded ${report.sentToEmployee ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                      {report.sentToEmployee ? '✓ Received' : 'Pending delivery'}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded ${report.sentToManager ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}>
                      {report.sentToManager ? '✓ Shared with manager' : 'Not shared with manager'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-6">No reports available yet</p>
          )}
        </div>
      </div>
    </div>
  );
}
