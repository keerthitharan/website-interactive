/*
  # Create employers and employees tables

  1. New Tables
    - `employers`
      - `id` (uuid, primary key)
      - `username` (text, unique)
      - `password` (text)
      - `email` (text)
      - `company_name` (text)
      - `created_at` (timestamp)
    - `employees`
      - `id` (uuid, primary key)
      - `employer_id` (uuid, foreign key)
      - `name` (text)
      - `company` (text)
      - `designation` (text)
      - `status` (text)
      - `email` (text)
      - `phone` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users to manage their own data
*/

-- Create employers table
CREATE TABLE IF NOT EXISTS employers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username text UNIQUE NOT NULL,
  password text NOT NULL,
  email text,
  company_name text,
  created_at timestamptz DEFAULT now()
);

-- Create employees table
CREATE TABLE IF NOT EXISTS employees (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  employer_id uuid REFERENCES employers(id) ON DELETE CASCADE,
  name text NOT NULL,
  company text NOT NULL,
  designation text NOT NULL,
  status text DEFAULT 'Active' CHECK (status IN ('Active', 'Inactive')),
  email text,
  phone text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE employers ENABLE ROW LEVEL SECURITY;
ALTER TABLE employees ENABLE ROW LEVEL SECURITY;

-- Create policies for employers
CREATE POLICY "Employers can read own data"
  ON employers
  FOR SELECT
  TO authenticated
  USING (auth.uid()::text = id::text);

CREATE POLICY "Employers can update own data"
  ON employers
  FOR UPDATE
  TO authenticated
  USING (auth.uid()::text = id::text);

-- Create policies for employees
CREATE POLICY "Employers can manage their employees"
  ON employees
  FOR ALL
  TO authenticated
  USING (employer_id::text = auth.uid()::text);

-- Insert demo employer
INSERT INTO employers (username, password, email, company_name) 
VALUES ('employer', 'admin123', 'employer@hardskello.com', 'Hardskello Inc.')
ON CONFLICT (username) DO NOTHING;