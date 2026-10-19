export type UserRole = 'manager' | 'employee' | 'doctor' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  company?: string;
  department?: string;
  specialization?: string;
  avatar?: string;
}

export interface Booking {
  id: string;
  employeeId: string;
  employeeName: string;
  doctorId: string;
  doctorName: string;
  date: string;
  time: string;
  type: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
}

export interface Referral {
  id: string;
  managerId: string;
  managerName: string;
  employeeId: string;
  employeeName: string;
  reason: string;
  urgency: 'low' | 'medium' | 'high';
  date: string;
  status: 'pending' | 'accepted' | 'completed';
  notes?: string;
}

export interface Report {
  id: string;
  employeeId: string;
  employeeName: string;
  doctorId: string;
  doctorName: string;
  date: string;
  type: string;
  findings: string;
  recommendations: string;
  fitnessStatus: 'fit' | 'fit-with-restrictions' | 'unfit' | 'pending';
  sentToEmployee: boolean;
  sentToManager: boolean;
  employeeConsent: boolean;
}

export interface ConsentSetting {
  employeeId: string;
  shareWithManager: boolean;
  shareDetails: 'full' | 'summary' | 'fitness-only';
  updatedAt: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  available: boolean;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}
