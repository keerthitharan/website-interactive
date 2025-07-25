import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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

// Auth functions
export const signInEmployer = async (username: string, password: string) => {
  const { data, error } = await supabase
    .from('employers')
    .select('*')
    .eq('username', username)
    .eq('password', password)
    .single();

  if (error) {
    throw new Error('Invalid credentials');
  }

  return data;
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
  const { data, error } = await supabase
    .from('employees')
    .select('*')
    .eq('employer_id', employerId)
    .order('created_at', { ascending: false });

  if (error) {
    throw error;
  }

  return data;
};

export const createEmployee = async (employee: Omit<Employee, 'id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('employees')
    .insert([employee])
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const updateEmployee = async (id: string, employee: Partial<Employee>) => {
  const { data, error } = await supabase
    .from('employees')
    .update({ ...employee, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const deleteEmployee = async (id: string) => {
  const { error } = await supabase
    .from('employees')
    .delete()
    .eq('id', id);

  if (error) {
    throw error;
  }
};