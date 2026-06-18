import { Employee } from '../models/Employee.js';

const seedEmployees = [
  {
    name: 'Aarav Mehta',
    email: 'aarav.mehta@company.com',
    department: 'Engineering',
    designation: 'Frontend Engineer',
    status: 'Active',
    joiningDate: '2025-01-14',
  },
  {
    name: 'Maya Srinivasan',
    email: 'maya.srinivasan@company.com',
    department: 'Product',
    designation: 'Product Manager',
    status: 'Active',
    joiningDate: '2025-02-03',
  },
  {
    name: 'Kabir Khan',
    email: 'kabir.khan@company.com',
    department: 'Design',
    designation: 'UX Designer',
    status: 'Inactive',
    joiningDate: '2025-02-20',
  },
  {
    name: 'Nisha Patel',
    email: 'nisha.patel@company.com',
    department: 'Sales',
    designation: 'Account Executive',
    status: 'Active',
    joiningDate: '2025-03-11',
  },
  {
    name: 'Rohan Iyer',
    email: 'rohan.iyer@company.com',
    department: 'Marketing',
    designation: 'Growth Marketer',
    status: 'Active',
    joiningDate: '2025-04-08',
  },
  {
    name: 'Fatima Ali',
    email: 'fatima.ali@company.com',
    department: 'People Ops',
    designation: 'HR Business Partner',
    status: 'Active',
    joiningDate: '2025-04-18',
  },
  {
    name: 'Dev Sharma',
    email: 'dev.sharma@company.com',
    department: 'Finance',
    designation: 'Finance Analyst',
    status: 'Inactive',
    joiningDate: '2025-05-09',
  },
  {
    name: 'Ira Kapoor',
    email: 'ira.kapoor@company.com',
    department: 'Engineering',
    designation: 'Backend Engineer',
    status: 'Active',
    joiningDate: '2025-05-27',
  },
];

export async function seedEmployeesIfEmpty() {
  const count = await Employee.countDocuments();

  if (count === 0) {
    await Employee.insertMany(seedEmployees);
    console.log('Seeded initial employee data.');
  }
}
