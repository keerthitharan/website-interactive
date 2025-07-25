import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Use placeholder values if environment variables are not set
const defaultUrl = 'https://placeholder.supabase.co';
const defaultKey = 'placeholder-key';

export const supabase = createClient(
  supabaseUrl || defaultUrl, 
  supabaseAnonKey || defaultKey
);

// Check if using placeholder values
export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey && 
  supabaseUrl !== defaultUrl && supabaseAnonKey !== defaultKey);

// Types
export interface Employer {
  id: string;
  username: string;
  email?: string;
  company_name?: string;
  created_at: string;
}

export interface Employee {
  id: string;
  employer_id: string;
  name: string;
  company: string;
  designation: string;
  status: 'Active' | 'Inactive';
  email?: string;
  phone?: string;
  created_at: string;
  updated_at: string;
}

// Mock data storage
const mockEmployers = [
  {
    id: '1',
    username: 'employer',
    password: 'admin123',
    email: 'employer@hardskello.com',
    company_name: 'Hardskello Inc.',
    created_at: new Date().toISOString()
  }
];

let mockEmployees: Employee[] = [
  {
    id: '1',
    employer_id: '1',
    name: 'John Doe',
    company: 'TechCorp',
    designation: 'Software Engineer',
    status: 'Active',
    email: 'john@techcorp.com',
    phone: '+1-555-0123',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '2',
    employer_id: '1',
    name: 'Jane Smith',
    company: 'FinanceFirst',
    designation: 'Financial Analyst',
    status: 'Active',
    email: 'jane@financefirst.com',
    phone: '+1-555-0124',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '3',
    employer_id: '1',
    name: 'Mike Johnson',
    company: 'HealthTech',
    designation: 'Product Manager',
    status: 'Inactive',
    email: 'mike@healthtech.com',
    phone: '+1-555-0125',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

// Simulate async delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Auth functions
export const signInEmployer = async (username: string, password: string) => {
  await delay(500); // Simulate network delay
  
  const employer = mockEmployers.find(emp => 
    emp.username === username && emp.password === password
  );

  if (!employer) {
    throw new Error('Invalid credentials');
  }

  // Return employer without password
  const { password: _, ...employerData } = employer;
  return employerData;
};

export const getCurrentEmployer = () => {
  const employerData = localStorage.getItem('currentEmployer');
  return employerData ? JSON.parse(employerData) : null;
};

export const setCurrentEmployer = (employer: Employer) => {
  localStorage.setItem('currentEmployer', JSON.stringify(employer));
};

export const signOutEmployer = () => {
  localStorage.removeItem('currentEmployer');
};

// Employee CRUD functions
export const getEmployees = async (employerId: string) => {
  await delay(300); // Simulate network delay
  
  return mockEmployees.filter(emp => emp.employer_id === employerId);
};

export const createEmployee = async (employee: Omit<Employee, 'id' | 'created_at' | 'updated_at'>) => {
  await delay(500); // Simulate network delay
  
  const newEmployee: Employee = {
    ...employee,
    id: Date.now().toString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  
  mockEmployees.push(newEmployee);
  return newEmployee;
};

export const updateEmployee = async (id: string, employee: Partial<Employee>) => {
  await delay(500); // Simulate network delay
  
  const index = mockEmployees.findIndex(emp => emp.id === id);
  if (index === -1) {
    throw new Error('Employee not found');
  }
  
  mockEmployees[index] = {
    ...mockEmployees[index],
    ...employee,
    updated_at: new Date().toISOString()
  };
  
  return mockEmployees[index];
};

export const deleteEmployee = async (id: string) => {
  await delay(300); // Simulate network delay
  
  const index = mockEmployees.findIndex(emp => emp.id === id);
  if (index === -1) {
    throw new Error('Employee not found');
  }
  
  mockEmployees.splice(index, 1);
};