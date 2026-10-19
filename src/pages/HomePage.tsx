import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Stethoscope, ClipboardCheck, Users, Clock, Award, ArrowRight, CheckCircle } from 'lucide-react';

export default function HomePage() {
  const services = [
    { icon: Stethoscope, title: 'Health Assessments', desc: 'Comprehensive annual health checks tailored to workplace requirements.' },
    { icon: Shield, title: 'Fitness for Duty', desc: 'Evaluate employee fitness for specific job roles and responsibilities.' },
    { icon: ClipboardCheck, title: 'Return to Work', desc: 'Structured programs for safe return after injury or illness.' },
    { icon: Users, title: 'Manager Referrals', desc: 'Easy referral system for managers to refer employees for assessment.' },
    { icon: Clock, title: 'Same-Day Appointments', desc: 'Urgent cases handled with priority scheduling and rapid turnaround.' },
    { icon: Award, title: 'Accredited Doctors', desc: 'Board-certified occupational medicine specialists on our team.' },
  ];

  const stats = [
    { value: '10,000+', label: 'Assessments Completed' },
    { value: '500+', label: 'Corporate Clients' },
    { value: '98%', label: 'Client Satisfaction' },
    { value: '24hr', label: 'Report Turnaround' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-teal-600 via-teal-700 to-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-300 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm mb-6">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                Trusted by 500+ Companies
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Protecting Your <span className="text-teal-200">Workforce</span> Health
              </h1>
              <p className="text-lg text-teal-100 mb-8 max-w-lg">
                Comprehensive occupational health services with secure digital portals for managers, employees, and doctors. Streamlined bookings, referrals, and consent-based reporting.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/bookings"
                  className="bg-white text-teal-700 px-6 py-3 rounded-lg font-semibold hover:bg-teal-50 transition-colors flex items-center gap-2"
                >
                  Book Appointment <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/login"
                  className="border-2 border-white/30 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
                >
                  Access Portal
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 bg-white/10 rounded-lg p-4">
                    <div className="bg-green-500/20 p-2 rounded-full">
                      <CheckCircle className="h-5 w-5 text-green-300" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Report Delivered</p>
                      <p className="text-xs text-teal-200">Employee consent verified • Manager notified</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-white/10 rounded-lg p-4">
                    <div className="bg-blue-500/20 p-2 rounded-full">
                      <ClipboardCheck className="h-5 w-5 text-blue-300" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">New Referral</p>
                      <p className="text-xs text-teal-200">Manager referred employee for assessment</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-white/10 rounded-lg p-4">
                    <div className="bg-purple-500/20 p-2 rounded-full">
                      <Users className="h-5 w-5 text-purple-300" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Booking Confirmed</p>
                      <p className="text-xs text-teal-200">Dr. Roberts • Tomorrow 9:00 AM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white py-12 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-teal-600">{stat.value}</div>
                <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive occupational health solutions designed to keep your workforce safe, healthy, and compliant.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                <div className="bg-teal-50 p-3 rounded-lg inline-block mb-4">
                  <service.icon className="h-6 w-6 text-teal-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our streamlined process ensures efficient health management for your organization.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Manager Refers', desc: 'Manager submits a referral for an employee assessment through the portal.' },
              { step: '2', title: 'Book & Attend', desc: 'Employee books appointment and attends the clinic for assessment.' },
              { step: '3', title: 'Doctor Reviews', desc: 'Doctor conducts assessment and prepares detailed report.' },
              { step: '4', title: 'Consent & Report', desc: 'Report shared based on employee consent preferences.' },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-12 h-12 bg-teal-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portal Features */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Secure Digital Portals</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Role-based access ensures the right information reaches the right people with full consent management.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium inline-block mb-4">Manager Portal</div>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" /> Refer employees for assessments</li>
                <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" /> Track referral status</li>
                <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" /> View reports (with consent)</li>
                <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" /> Manage team health records</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium inline-block mb-4">Employee Portal</div>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" /> View personal health reports</li>
                <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" /> Set consent preferences</li>
                <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" /> Book appointments</li>
                <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" /> Review recommendations</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium inline-block mb-4">Doctor Portal</div>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" /> Create detailed reports</li>
                <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" /> Send to employee first for review</li>
                <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" /> Respect consent settings</li>
                <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" /> Manage appointments</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-teal-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-teal-100 mb-8 max-w-2xl mx-auto">
            Book an appointment today or access your portal to manage referrals, reports, and consent settings.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/bookings" className="bg-white text-teal-700 px-6 py-3 rounded-lg font-semibold hover:bg-teal-50 transition-colors">
              Book Appointment
            </Link>
            <Link to="/login" className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
              Login to Portal
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
