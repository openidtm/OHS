import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Calendar, Search, Filter } from 'lucide-react';

export default function BookingsListPage() {
  const { currentUser, bookings, updateBookingStatus } = useApp();
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  let filteredBookings = bookings;

  if (currentUser) {
    if (currentUser.role === 'doctor') {
      filteredBookings = bookings.filter(b => b.doctorId === currentUser.id);
    } else if (currentUser.role === 'employee') {
      filteredBookings = bookings.filter(b => b.employeeId === currentUser.id);
    }
  }

  if (search) {
    filteredBookings = filteredBookings.filter(b =>
      b.employeeName.toLowerCase().includes(search.toLowerCase()) ||
      b.type.toLowerCase().includes(search.toLowerCase()) ||
      b.doctorName.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (filterStatus) {
    filteredBookings = filteredBookings.filter(b => b.status === filterStatus);
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Calendar className="h-6 w-6 text-teal-600" /> Appointments
          </h1>
          <p className="text-gray-600">
            {currentUser ? `Your ${currentUser.role === 'doctor' ? 'patient' : ''} appointments` : 'All appointments'}
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search appointments..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="pl-10 pr-8 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none appearance-none"
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Bookings List */}
        <div className="space-y-3">
          {filteredBookings.map(booking => (
            <div key={booking.id} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-gray-800">{booking.type}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${
                      booking.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                      booking.status === 'confirmed' ? 'bg-blue-100 text-blue-700' :
                      booking.status === 'completed' ? 'bg-green-100 text-green-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-gray-600">
                    <div><span className="text-gray-400">Patient:</span> {booking.employeeName}</div>
                    <div><span className="text-gray-400">Doctor:</span> {booking.doctorName}</div>
                    <div><span className="text-gray-400">Date:</span> {booking.date}</div>
                    <div><span className="text-gray-400">Time:</span> {booking.time}</div>
                  </div>
                  {booking.notes && <p className="text-xs text-gray-500 mt-2">Notes: {booking.notes}</p>}
                </div>
                {currentUser?.role === 'doctor' && booking.status === 'confirmed' && (
                  <button
                    onClick={() => updateBookingStatus(booking.id, 'completed')}
                    className="text-xs bg-green-50 text-green-700 px-3 py-1.5 rounded-lg hover:bg-green-100 font-medium"
                  >
                    Mark Complete
                  </button>
                )}
              </div>
            </div>
          ))}

          {filteredBookings.length === 0 && (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
              <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No appointments found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
