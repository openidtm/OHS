import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { FileText, Plus, AlertCircle, CheckCircle, Send, Eye, Shield } from 'lucide-react';

export default function ReportsPage() {
  const { currentUser, reports, addReport, updateReport, consents, users } = useApp();
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    employeeId: '',
    type: '',
    findings: '',
    recommendations: '',
    fitnessStatus: 'fit' as 'fit' | 'fit-with-restrictions' | 'unfit' | 'pending',
  });
  const [submitted, setSubmitted] = useState(false);
  const [deliveryMessage, setDeliveryMessage] = useState('');

  if (!currentUser || currentUser.role !== 'doctor') {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-4">Only doctors can access the reports page.</p>
          <button onClick={() => navigate('/dashboard')} className="bg-teal-600 text-white px-6 py-2 rounded-lg font-medium">
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const myReports = reports.filter(r => r.doctorId === currentUser.id);
  const employees = users.filter(u => u.role === 'employee');

  const getEmployeeConsent = (employeeId: string) => {
    return consents.find(c => c.employeeId === employeeId);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const employee = users.find(u => u.id === formData.employeeId);
    const consent = getEmployeeConsent(formData.employeeId);

    const newReport = {
      id: `rep${Date.now()}`,
      employeeId: formData.employeeId,
      employeeName: employee?.name || '',
      doctorId: currentUser.id,
      doctorName: currentUser.name,
      date: new Date().toISOString().split('T')[0],
      type: formData.type,
      findings: formData.findings,
      recommendations: formData.recommendations,
      fitnessStatus: formData.fitnessStatus,
      sentToEmployee: true,
      sentToManager: false,
      employeeConsent: consent?.shareWithManager || false,
    };

    addReport(newReport);
    setSubmitted(true);

    // Determine delivery message
    if (consent?.shareWithManager) {
      const detailLevel = consent.shareDetails;
      if (detailLevel === 'full') {
        setDeliveryMessage('Report sent to employee. Full report will be shared with manager.');
      } else if (detailLevel === 'summary') {
        setDeliveryMessage('Report sent to employee. Summary will be shared with manager.');
      } else {
        setDeliveryMessage('Report sent to employee. Fitness status only will be shared with manager.');
      }
    } else {
      setDeliveryMessage('Report sent to employee. Report will NOT be shared with manager (no consent).');
    }

    setTimeout(() => {
      setSubmitted(false);
      setShowForm(false);
      setFormData({ employeeId: '', type: '', findings: '', recommendations: '', fitnessStatus: 'fit' });
    }, 4000);
  };

  const handleSendToManager = (reportId: string) => {
    const report = reports.find(r => r.id === reportId);
    if (report) {
      updateReport({ ...report, sentToManager: true });
    }
  };

  const reportTypes = [
    'Annual Health Assessment',
    'Ergonomic Assessment',
    'Return to Work Assessment',
    'Fitness for Duty Evaluation',
    'Injury Assessment',
    'Drug & Alcohol Screening',
    'Stress Assessment',
    'Hearing Test',
    'Vision Screening',
  ];

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Medical Reports</h1>
            <p className="text-gray-600">Create and manage occupational health reports</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-teal-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-teal-700 flex items-center gap-2"
          >
            <Plus className="h-4 w-4" /> New Report
          </button>
        </div>

        {/* New Report Form */}
        {showForm && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
            {submitted ? (
              <div className="text-center py-6">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Report Created & Sent to Employee</h3>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 max-w-md mx-auto">
                  <p className="text-sm text-blue-800 flex items-center gap-2 justify-center">
                    <Shield className="h-4 w-4" /> {deliveryMessage}
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-teal-600" /> Create New Report
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
                        <option key={emp.id} value={emp.id}>{emp.name} ({emp.company})</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Report Type</label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      required
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                    >
                      <option value="">Select type...</option>
                      {reportTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Consent Info */}
                {formData.employeeId && (
                  <div className={`rounded-lg p-3 border ${
                    getEmployeeConsent(formData.employeeId)?.shareWithManager
                      ? 'bg-green-50 border-green-200'
                      : 'bg-orange-50 border-orange-200'
                  }`}>
                    <p className="text-sm flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      {getEmployeeConsent(formData.employeeId)?.shareWithManager ? (
                        <span className="text-green-800">
                          <strong>Employee consents to sharing with manager.</strong> Level: {getEmployeeConsent(formData.employeeId)?.shareDetails || 'fitness-only'}
                        </span>
                      ) : (
                        <span className="text-orange-800">
                          <strong>Employee has NOT consented to sharing with manager.</strong> Report will only be sent to employee.
                        </span>
                      )}
                    </p>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fitness Status</label>
                  <select
                    value={formData.fitnessStatus}
                    onChange={(e) => setFormData({ ...formData, fitnessStatus: e.target.value as any })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                  >
                    <option value="fit">Fit for Duty</option>
                    <option value="fit-with-restrictions">Fit with Restrictions</option>
                    <option value="unfit">Unfit for Duty</option>
                    <option value="pending">Pending Further Assessment</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Clinical Findings</label>
                  <textarea
                    value={formData.findings}
                    onChange={(e) => setFormData({ ...formData, findings: e.target.value })}
                    required
                    rows={3}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none resize-none"
                    placeholder="Describe clinical findings..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Recommendations</label>
                  <textarea
                    value={formData.recommendations}
                    onChange={(e) => setFormData({ ...formData, recommendations: e.target.value })}
                    required
                    rows={3}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none resize-none"
                    placeholder="List recommendations..."
                  />
                </div>

                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <p className="text-sm text-gray-700 flex items-start gap-2">
                    <Send className="h-4 w-4 mt-0.5 text-teal-600 shrink-0" />
                    <span>
                      On submission, the report will be <strong>sent to the employee first</strong> for review.
                      {getEmployeeConsent(formData.employeeId)?.shareWithManager
                        ? ' Based on employee consent, it will then be shared with their manager.'
                        : ' The employee has not consented to sharing with their manager.'}
                    </span>
                  </p>
                </div>

                <div className="flex gap-3">
                  <button type="submit" className="bg-teal-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-teal-700 flex items-center gap-2">
                    <Send className="h-4 w-4" /> Create & Send Report
                  </button>
                  <button type="button" onClick={() => setShowForm(false)} className="text-gray-600 px-6 py-2.5 rounded-lg font-medium hover:bg-gray-100">
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Reports List */}
        <div className="space-y-3">
          {myReports.map(report => {
            const consent = getEmployeeConsent(report.employeeId);
            const isExpanded = selectedReport === report.id;

            return (
              <div key={report.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div
                  className="p-5 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => setSelectedReport(isExpanded ? null : report.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-gray-800">{report.employeeName}</h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          report.fitnessStatus === 'fit' ? 'bg-green-100 text-green-700' :
                          report.fitnessStatus === 'fit-with-restrictions' ? 'bg-yellow-100 text-yellow-700' :
                          report.fitnessStatus === 'unfit' ? 'bg-red-100 text-red-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {report.fitnessStatus === 'fit-with-restrictions' ? 'Fit (Restricted)' : report.fitnessStatus}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{report.type} • {report.date}</p>
                      <div className="flex gap-2 mt-2">
                        <span className={`text-xs px-2 py-0.5 rounded ${report.sentToEmployee ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                          {report.sentToEmployee ? '✓ Sent to Employee' : 'Draft'}
                        </span>
                        <span className={`text-xs px-2 py-0.5 rounded ${report.sentToManager ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}>
                          {report.sentToManager ? '✓ Sent to Manager' : 'Not sent to Manager'}
                        </span>
                      </div>
                    </div>
                    <Eye className="h-5 w-5 text-gray-400" />
                  </div>
                </div>

                {isExpanded && (
                  <div className="border-t px-5 py-4 bg-gray-50">
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-1">Findings</h4>
                        <p className="text-sm text-gray-600">{report.findings}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-1">Recommendations</h4>
                        <p className="text-sm text-gray-600 whitespace-pre-line">{report.recommendations}</p>
                      </div>
                      <div className="flex items-center gap-4 pt-2 border-t">
                        <div className="text-xs text-gray-500">
                          <Shield className="h-3 w-3 inline mr-1" />
                          Employee consent: {consent?.shareWithManager ? `Yes (${consent.shareDetails})` : 'No'}
                        </div>
                        {report.sentToEmployee && !report.sentToManager && consent?.shareWithManager && (
                          <button
                            onClick={(e) => { e.stopPropagation(); handleSendToManager(report.id); }}
                            className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 font-medium flex items-center gap-1"
                          >
                            <Send className="h-3 w-3" /> Send to Manager Now
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {myReports.length === 0 && (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
              <FileText className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No reports created yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
