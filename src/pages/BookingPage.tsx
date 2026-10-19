import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { appointmentTypes, timeSlots, mockDoctors } from '../data/mockData';
import { Calendar, Clock, User, FileText, CheckCircle, ArrowRight } from 'lucide-react';

export default function BookingPage() {
  const { addBooking, currentUser } = useApp();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    employeeName: currentUser?.name || '',
    employeeEmail: currentUser?.email || '',
    doctorId: '',
    date: '',
    time: '',
    type: '',
    notes: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const availableDoctors = mockDoctors.filter(d => d.available);

  const handleSubmit = () => {
    const doctor = mockDoctors.find(d => d.id === formData.doctorId);
    addBooking({
      id: `b${Date.now()}`,
      employeeId: currentUser?.id || `e${Date.now()}`,
      employeeName: formData.employeeName,
      doctorId: formData.doctorId,
      doctorName: doctor?.name || '',
      date: formData.date,
      time: formData.time,
      type: formData.type,
      status: 'pending',
      notes: formData.notes,
    });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-gray-50 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full text-center bg-white rounded-2xl p-8 shadow-lg">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Booking Confirmed!</h2>
          <p className="text-gray-600 mb-6">Your appointment has been scheduled. You'll receive a confirmation email shortly.</p>
          <div className="bg-gray-50 rounded-lg p-4 text-left space-y-2 mb-6">
            <p className="text-sm"><span className="font-medium">Type:</span> {formData.type}</p>
            <p className="text-sm"><span className="font-medium">Doctor:</span> {mockDoctors.find(d => d.id === formData.doctorId)?.name}</p>
            <p className="text-sm"><span className="font-medium">Date:</span> {formData.date}</p>
            <p className="text-sm"><span className="font-medium">Time:</span> {formData.time}</p>
          </div>
          <button onClick={() => { setSubmitted(false); setStep(1); setFormData({ employeeName: '', employeeEmail: '', doctorId: '', date: '', time: '', type: '', notes: '' }); }} className="text-teal-600 font-medium hover:text-teal-700">
            Book Another Appointment
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Book an Appointment</h1>
          <p className="text-gray-600">Schedule your occupational health assessment</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-10">
          {[1, 2, 3].map((s) => (
            <React.Fragment key={s}>
              <div className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold text-sm ${
                step >= s ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                {s}
              </div>
              {s < 3 && <div className={`w-16 h-1 mx-1 rounded ${step > s ? 'bg-teal-600' : 'bg-gray-200'}`} />}
            </React.Fragment>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          {/* Step 1: Appointment Type */}
          {step === 1 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <FileText className="h-5 w-5 text-teal-600" /> Select Appointment Type
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {appointmentTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setFormData({ ...formData, type })}
                    className={`text-left px-4 py-3 rounded-lg border transition-all ${
                      formData.type === type
                        ? 'border-teal-500 bg-teal-50 text-teal-700'
                        : 'border-gray-200 hover:border-teal-300 hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-sm font-medium">{type}</span>
                  </button>
                ))}
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => formData.type && setStep(2)}
                  disabled={!formData.type}
                  className="bg-teal-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  Next <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Doctor & Date */}
          {step === 2 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <User className="h-5 w-5 text-teal-600" /> Choose Doctor & Date
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Doctor</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {availableDoctors.map((doctor) => (
                      <button
                        key={doctor.id}
                        onClick={() => setFormData({ ...formData, doctorId: doctor.id })}
                        className={`text-left px-4 py-3 rounded-lg border transition-all ${
                          formData.doctorId === doctor.id
                            ? 'border-teal-500 bg-teal-50'
                            : 'border-gray-200 hover:border-teal-300'
                        }`}
                      >
                        <p className="font-medium text-gray-800">{doctor.name}</p>
                        <p className="text-sm text-gray-500">{doctor.specialization}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                      <Calendar className="h-4 w-4" /> Date
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                      <Clock className="h-4 w-4" /> Time
                    </label>
                    <select
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                    >
                      <option value="">Select time...</option>
                      {timeSlots.map(slot => (
                        <option key={slot} value={slot}>{slot}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex justify-between">
                <button onClick={() => setStep(1)} className="text-gray-600 hover:text-gray-800 font-medium">Back</button>
                <button
                  onClick={() => formData.doctorId && formData.date && formData.time && setStep(3)}
                  disabled={!formData.doctorId || !formData.date || !formData.time}
                  className="bg-teal-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  Next <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Details & Confirm */}
          {step === 3 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-teal-600" /> Confirm Booking
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      value={formData.employeeName}
                      onChange={(e) => setFormData({ ...formData, employeeName: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={formData.employeeEmail}
                      onChange={(e) => setFormData({ ...formData, employeeEmail: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes (optional)</label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none resize-none"
                    placeholder="Any additional information..."
                  />
                </div>

                {/* Summary */}
                <div className="bg-teal-50 rounded-lg p-4 border border-teal-100">
                  <h3 className="font-semibold text-teal-800 mb-3">Booking Summary</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <span className="text-gray-600">Type:</span><span className="font-medium">{formData.type}</span>
                    <span className="text-gray-600">Doctor:</span><span className="font-medium">{mockDoctors.find(d => d.id === formData.doctorId)?.name}</span>
                    <span className="text-gray-600">Date:</span><span className="font-medium">{formData.date}</span>
                    <span className="text-gray-600">Time:</span><span className="font-medium">{formData.time}</span>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex justify-between">
                <button onClick={() => setStep(2)} className="text-gray-600 hover:text-gray-800 font-medium">Back</button>
                <button
                  onClick={handleSubmit}
                  className="bg-teal-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-teal-700 flex items-center gap-2"
                >
                  <CheckCircle className="h-4 w-4" /> Confirm Booking
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
