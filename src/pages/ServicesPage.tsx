import React from 'react';
import { Link } from 'react-router-dom';
import { Stethoscope, Shield, ClipboardCheck, Heart, Brain, Ear, Eye, Pill, ArrowRight } from 'lucide-react';

export default function ServicesPage() {
  const services = [
    {
      icon: Stethoscope,
      title: 'Annual Health Assessments',
      desc: 'Comprehensive health screenings including physical examination, blood tests, and lifestyle assessment tailored to occupational requirements.',
      features: ['Full physical examination', 'Blood pressure & BMI', 'Vision & hearing tests', 'Lifestyle questionnaire'],
    },
    {
      icon: Shield,
      title: 'Fitness for Duty Evaluations',
      desc: 'Assess whether employees are medically fit to perform their job duties safely and effectively.',
      features: ['Job-specific assessments', 'Physical capability testing', 'Mental fitness evaluation', 'Clearance documentation'],
    },
    {
      icon: ClipboardCheck,
      title: 'Return to Work Programs',
      desc: 'Structured rehabilitation and return-to-work programs following injury or extended illness.',
      features: ['Gradual return planning', 'Modified duty recommendations', 'Progress monitoring', 'Employer coordination'],
    },
    {
      icon: Brain,
      title: 'Stress & Mental Health',
      desc: 'Workplace stress assessments and mental health support programs for employees.',
      features: ['Stress risk assessment', 'Coping strategies', 'Referral to specialists', 'Workplace adjustments'],
    },
    {
      icon: Ear,
      title: 'Audiometric Testing',
      desc: 'Hearing conservation programs for employees exposed to noise in the workplace.',
      features: ['Baseline hearing tests', 'Annual monitoring', 'Noise exposure assessment', 'Hearing protection advice'],
    },
    {
      icon: Eye,
      title: 'Vision Screening',
      desc: 'Comprehensive eye examinations for employees, especially those in screen-based or safety-critical roles.',
      features: ['Visual acuity testing', 'Color vision assessment', 'Eye strain evaluation', 'DSE assessments'],
    },
    {
      icon: Pill,
      title: 'Drug & Alcohol Screening',
      desc: 'Confidential drug and alcohol testing programs for safety-sensitive positions.',
      features: ['Pre-employment testing', 'Random screening', 'Post-incident testing', 'Chain of custody protocols'],
    },
    {
      icon: Heart,
      title: 'Vaccination Programs',
      desc: 'Workplace vaccination programs including flu shots, hepatitis B, and travel vaccinations.',
      features: ['Flu vaccination', 'Hepatitis B', 'Travel vaccines', 'On-site clinics'],
    },
  ];

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-teal-600 to-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h1>
          <p className="text-teal-100 max-w-2xl mx-auto">
            Comprehensive occupational health services designed to protect and promote the wellbeing of your workforce.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="bg-teal-50 p-3 rounded-lg shrink-0">
                    <service.icon className="h-6 w-6 text-teal-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{service.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{service.desc}</p>
                    <ul className="grid grid-cols-2 gap-1">
                      {service.features.map((feature, j) => (
                        <li key={j} className="text-xs text-gray-500 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 bg-teal-400 rounded-full"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-teal-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Need a Custom Solution?</h2>
          <p className="text-teal-100 mb-6">
            We offer tailored occupational health programs for organizations of all sizes.
          </p>
          <Link
            to="/bookings"
            className="inline-flex items-center gap-2 bg-white text-teal-700 px-6 py-3 rounded-lg font-semibold hover:bg-teal-50 transition-colors"
          >
            Book a Consultation <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
