import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Calendar, FileText, Users, ClipboardCheck, TrendingUp, Clock, AlertCircle } from 'lucide-react';

export default function DashboardPage() {
  const { currentUser, bookings, referrals, reports } = useApp();
  const navigate = useNavigate();

  if (!currentUser) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Not Logged In</h2>
          <p className="text-gray-600 mb-4">Please login to access your dashboard.</p>
          <button onClick={() => navigate('/login')} className="bg-teal-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-teal-700">
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  const renderManagerDashboard = () => {
    const myReferrals = referrals.filter(r => r.managerId === currentUser.id);
    const teamBookings = bookings.filter(b => myReferrals.some(r => r.employeeId === b.employeeId));
    const pendingCount = myReferrals.filter(r => r.status === 'pending').length;

    return (
      <div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <StatCard icon={Users} label="Team Referrals" value={myReferrals.length} color="blue" />
          <StatCard icon={Clock} label="Pending" value={pendingCount} color="yellow" />
          <StatCard icon={Calendar} label="Team Bookings" value={teamBookings.length} color="green" />
          <StatCard icon={TrendingUp} label="Completed" value={myReferrals.filter(r => r.status === 'completed').length} color="purple" />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-800">Recent Referrals</h3>
              <button onClick={() => navigate('/referrals')} className="text-sm text-teal-600 hover:text-teal-700 font-medium">View All</button>
            </div>
            <div className="space-y-3">
              {myReferrals.slice(0, 3).map(ref => (
                <div key={ref.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm text-gray-800">{ref.employeeName}</p>
                    <p className="text-xs text-gray-500">{ref.reason.substring(0, 40)}...</p>
                  </div>
                  <StatusBadge status={ref.status} />
                </div>
              ))}
              {myReferrals.length === 0 && <p className="text-sm text-gray-500 text-center py-4">No referrals yet</p>}
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-800 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button onClick={() => navigate('/referrals')} className="w-full text-left px-4 py-3 bg-teal-50 hover:bg-teal-100 rounded-lg transition-colors">
                <p className="font-medium text-teal-800 text-sm">Refer an Employee</p>
                <p className="text-xs text-teal-600">Submit a new referral for assessment</p>
              </button>
              <button onClick={() => navigate('/bookings')} className="w-full text-left px-4 py-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                <p className="font-medium text-blue-800 text-sm">Book Appointment</p>
                <p className="text-xs text-blue-600">Schedule a new appointment</p>
              </button>
              <button onClick={() => navigate('/bookings/list')} className="w-full text-left px-4 py-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
                <p className="font-medium text-purple-800 text-sm">View All Appointments</p>
                <p className="text-xs text-purple-600">See upcoming and past bookings</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderEmployeeDashboard = () => {
    const myBookings = bookings.filter(b => b.employeeId === currentUser.id);
    const myReports = reports.filter(r => r.employeeId === currentUser.id && r.sentToEmployee);

    return (
      <div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <StatCard icon={Calendar} label="My Appointments" value={myBookings.length} color="blue" />
          <StatCard icon={FileText} label="My Reports" value={myReports.length} color="green" />
          <StatCard icon={ClipboardCheck} label="Upcoming" value={myBookings.filter(b => b.status === 'confirmed').length} color="purple" />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-800 mb-4">Upcoming Appointments</h3>
            <div className="space-y-3">
              {myBookings.filter(b => b.status !== 'cancelled').slice(0, 3).map(booking => (
                <div key={booking.id} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-sm text-gray-800">{booking.type}</p>
                    <StatusBadge status={booking.status} />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{booking.doctorName} • {booking.date} at {booking.time}</p>
                </div>
              ))}
              {myBookings.length === 0 && <p className="text-sm text-gray-500 text-center py-4">No upcoming appointments</p>}
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-800 mb-4">My Reports</h3>
            <div className="space-y-3">
              {myReports.slice(0, 3).map(report => (
                <div key={report.id} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-sm text-gray-800">{report.type}</p>
                    <FitnessBadge status={report.fitnessStatus} />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{report.doctorName} • {report.date}</p>
                </div>
              ))}
              {myReports.length === 0 && <p className="text-sm text-gray-500 text-center py-4">No reports available</p>}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderDoctorDashboard = () => {
    const myBookings = bookings.filter(b => b.doctorId === currentUser.id);
    const myReports = reports.filter(r => r.doctorId === currentUser.id);
    const pendingBookings = myBookings.filter(b => b.status === 'confirmed');

    return (
      <div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <StatCard icon={Calendar} label="My Appointments" value={myBookings.length} color="blue" />
          <StatCard icon={Clock} label="Upcoming" value={pendingBookings.length} color="yellow" />
          <StatCard icon={FileText} label="Reports Written" value={myReports.length} color="green" />
          <StatCard icon={ClipboardCheck} label="Pending Reports" value={myReports.filter(r => !r.sentToEmployee).length} color="purple" />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-800">Upcoming Appointments</h3>
              <button onClick={() => navigate('/bookings')} className="text-sm text-teal-600 hover:text-teal-700 font-medium">View All</button>
            </div>
            <div className="space-y-3">
              {pendingBookings.slice(0, 4).map(booking => (
                <div key={booking.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm text-gray-800">{booking.employeeName}</p>
                    <p className="text-xs text-gray-500">{booking.type} • {booking.date} {booking.time}</p>
                  </div>
                  <StatusBadge status={booking.status} />
                </div>
              ))}
              {pendingBookings.length === 0 && <p className="text-sm text-gray-500 text-center py-4">No upcoming appointments</p>}
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-800">Recent Reports</h3>
              <button onClick={() => navigate('/reports')} className="text-sm text-teal-600 hover:text-teal-700 font-medium">View All</button>
            </div>
            <div className="space-y-3">
              {myReports.slice(0, 4).map(report => (
                <div key={report.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm text-gray-800">{report.employeeName}</p>
                    <p className="text-xs text-gray-500">{report.type} • {report.date}</p>
                  </div>
                  <div className="flex gap-1">
                    {report.sentToEmployee && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">Sent</span>}
                    {!report.sentToEmployee && <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded">Draft</span>}
                  </div>
                </div>
              ))}
              {myReports.length === 0 && <p className="text-sm text-gray-500 text-center py-4">No reports yet</p>}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">
            Welcome back, {currentUser.name}
          </h1>
          <p className="text-gray-600 capitalize">
            {currentUser.role} Dashboard {currentUser.company ? `• ${currentUser.company}` : ''}
          </p>
        </div>

        {currentUser.role === 'manager' && renderManagerDashboard()}
        {currentUser.role === 'employee' && renderEmployeeDashboard()}
        {currentUser.role === 'doctor' && renderDoctorDashboard()}
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color }: { icon: React.ElementType; label: string; value: number; color: string }) {
  const colors: Record<string, string> = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    yellow: 'bg-yellow-50 text-yellow-600',
    purple: 'bg-purple-50 text-purple-600',
  };
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${colors[color]}`}>
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
          <p className="text-xs text-gray-500">{label}</p>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-700',
    confirmed: 'bg-blue-100 text-blue-700',
    completed: 'bg-green-100 text-green-700',
    cancelled: 'bg-red-100 text-red-700',
    accepted: 'bg-blue-100 text-blue-700',
  };
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${colors[status] || 'bg-gray-100 text-gray-700'}`}>
      {status}
    </span>
  );
}

function FitnessBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    'fit': 'bg-green-100 text-green-700',
    'fit-with-restrictions': 'bg-yellow-100 text-yellow-700',
    'unfit': 'bg-red-100 text-red-700',
    'pending': 'bg-gray-100 text-gray-700',
  };
  const labels: Record<string, string> = {
    'fit': 'Fit',
    'fit-with-restrictions': 'Fit (Restricted)',
    'unfit': 'Unfit',
    'pending': 'Pending',
  };
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${colors[status] || 'bg-gray-100 text-gray-700'}`}>
      {labels[status] || status}
    </span>
  );
}
