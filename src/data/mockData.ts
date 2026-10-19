import { User, Booking, Referral, Report, Doctor, ConsentSetting } from '../types';

export const mockUsers: User[] = [
  { id: 'm1', name: 'Sarah Johnson', email: 'sarah@acmecorp.com', role: 'manager', company: 'Acme Corp', department: 'Operations' },
  { id: 'm2', name: 'David Chen', email: 'david@techinc.com', role: 'manager', company: 'Tech Inc', department: 'Engineering' },
  { id: 'e1', name: 'James Wilson', email: 'james@acmecorp.com', role: 'employee', company: 'Acme Corp', department: 'Warehouse' },
  { id: 'e2', name: 'Maria Garcia', email: 'maria@acmecorp.com', role: 'employee', company: 'Acme Corp', department: 'Logistics' },
  { id: 'e3', name: 'Tom Brown', email: 'tom@techinc.com', role: 'employee', company: 'Tech Inc', department: 'Manufacturing' },
  { id: 'd1', name: 'Dr. Emily Roberts', email: 'emily@occuphealth.com', role: 'doctor', specialization: 'Occupational Medicine' },
  { id: 'd2', name: 'Dr. Michael Park', email: 'michael@occuphealth.com', role: 'doctor', specialization: 'Physical Therapy' },
  { id: 'd3', name: 'Dr. Lisa Thompson', email: 'lisa@occuphealth.com', role: 'doctor', specialization: 'Ergonomics' },
];

export const mockDoctors: Doctor[] = [
  { id: 'd1', name: 'Dr. Emily Roberts', specialization: 'Occupational Medicine', available: true },
  { id: 'd2', name: 'Dr. Michael Park', specialization: 'Physical Therapy', available: true },
  { id: 'd3', name: 'Dr. Lisa Thompson', specialization: 'Ergonomics', available: false },
];

export const mockBookings: Booking[] = [
  { id: 'b1', employeeId: 'e1', employeeName: 'James Wilson', doctorId: 'd1', doctorName: 'Dr. Emily Roberts', date: '2026-01-20', time: '09:00', type: 'Annual Health Assessment', status: 'confirmed' },
  { id: 'b2', employeeId: 'e2', employeeName: 'Maria Garcia', doctorId: 'd2', doctorName: 'Dr. Michael Park', date: '2026-01-21', time: '10:30', type: 'Ergonomic Assessment', status: 'pending' },
  { id: 'b3', employeeId: 'e3', employeeName: 'Tom Brown', doctorId: 'd1', doctorName: 'Dr. Emily Roberts', date: '2026-01-22', time: '14:00', type: 'Return to Work Assessment', status: 'confirmed' },
];

export const mockReferrals: Referral[] = [
  { id: 'r1', managerId: 'm1', managerName: 'Sarah Johnson', employeeId: 'e1', employeeName: 'James Wilson', reason: 'Recurring back pain reported during warehouse duties', urgency: 'medium', date: '2026-01-15', status: 'accepted', notes: 'Employee has been experiencing discomfort for 2 weeks' },
  { id: 'r2', managerId: 'm2', managerName: 'David Chen', employeeId: 'e3', employeeName: 'Tom Brown', reason: 'Post-surgery fitness for duty evaluation', urgency: 'high', date: '2026-01-16', status: 'pending', notes: 'Cleared by personal physician, needs occupational clearance' },
  { id: 'r3', managerId: 'm1', managerName: 'Sarah Johnson', employeeId: 'e2', employeeName: 'Maria Garcia', reason: 'Ergonomic workstation assessment', urgency: 'low', date: '2026-01-17', status: 'completed' },
];

export const mockReports: Report[] = [
  {
    id: 'rep1',
    employeeId: 'e1',
    employeeName: 'James Wilson',
    doctorId: 'd1',
    doctorName: 'Dr. Emily Roberts',
    date: '2026-01-18',
    type: 'Ergonomic Assessment',
    findings: 'Employee shows signs of lumbar strain consistent with repetitive lifting. Posture assessment reveals improper lifting technique. No structural damage detected.',
    recommendations: '1. Modified duties for 2 weeks (no lifting >10kg)\n2. Ergonomic training session\n3. Physiotherapy referral\n4. Follow-up in 4 weeks',
    fitnessStatus: 'fit-with-restrictions',
    sentToEmployee: true,
    sentToManager: true,
    employeeConsent: true,
  },
  {
    id: 'rep2',
    employeeId: 'e2',
    employeeName: 'Maria Garcia',
    doctorId: 'd2',
    doctorName: 'Dr. Michael Park',
    date: '2026-01-19',
    type: 'Workstation Assessment',
    findings: 'Workstation setup is suboptimal. Monitor height and chair positioning need adjustment. Employee reports occasional neck tension.',
    recommendations: '1. Adjust monitor to eye level\n2. Provide lumbar support cushion\n3. Schedule micro-breaks every 45 minutes\n4. Stretching exercises program',
    fitnessStatus: 'fit',
    sentToEmployee: true,
    sentToManager: false,
    employeeConsent: false,
  },
];

export const mockConsents: ConsentSetting[] = [
  { employeeId: 'e1', shareWithManager: true, shareDetails: 'summary', updatedAt: '2026-01-10' },
  { employeeId: 'e2', shareWithManager: false, shareDetails: 'fitness-only', updatedAt: '2026-01-12' },
  { employeeId: 'e3', shareWithManager: true, shareDetails: 'full', updatedAt: '2026-01-08' },
];

export const appointmentTypes = [
  'Annual Health Assessment',
  'Ergonomic Assessment',
  'Return to Work Assessment',
  'Fitness for Duty Evaluation',
  'Injury Assessment',
  'Drug & Alcohol Screening',
  'Vaccination',
  'Stress Assessment',
  'Hearing Test',
  'Vision Screening',
];

export const timeSlots = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
  '11:00', '11:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30',
];
