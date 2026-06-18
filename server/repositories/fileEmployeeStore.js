import { randomUUID } from 'crypto';
import { mkdir, readFile, writeFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDirectory = path.resolve(__dirname, '../data');
const dataFile = path.join(dataDirectory, 'employees.json');

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

async function readEmployees() {
  try {
    const content = await readFile(dataFile, 'utf8');
    return JSON.parse(content);
  } catch {
    return [];
  }
}

async function writeEmployees(employees) {
  await mkdir(dataDirectory, { recursive: true });
  await writeFile(dataFile, JSON.stringify(employees, null, 2));
}

export async function initializeFileStore() {
  await mkdir(dataDirectory, { recursive: true });
  const employees = await readEmployees();

  if (employees.length === 0) {
    await writeEmployees(seedEmployees.map((employee) => ({ ...employee, id: randomUUID() })));
  }
}

export const fileEmployeeStore = {
  async list() {
    const employees = await readEmployees();
    return employees.sort((a, b) => new Date(b.joiningDate) - new Date(a.joiningDate));
  },

  async create(payload) {
    const employees = await readEmployees();
    const duplicate = employees.some((employee) => employee.email.toLowerCase() === payload.email.toLowerCase());

    if (duplicate) {
      const error = new Error('An employee with this email already exists.');
      error.statusCode = 409;
      throw error;
    }

    const employee = { ...payload, id: randomUUID() };
    await writeEmployees([employee, ...employees]);
    return employee;
  },

  async update(id, payload) {
    const employees = await readEmployees();
    const index = employees.findIndex((employee) => employee.id === id);

    if (index === -1) {
      const error = new Error('Employee not found.');
      error.statusCode = 404;
      throw error;
    }

    const duplicate = employees.some(
      (employee) => employee.id !== id && employee.email.toLowerCase() === payload.email.toLowerCase(),
    );

    if (duplicate) {
      const error = new Error('An employee with this email already exists.');
      error.statusCode = 409;
      throw error;
    }

    const updated = { ...employees[index], ...payload, id };
    employees[index] = updated;
    await writeEmployees(employees);
    return updated;
  },

  async remove(id) {
    const employees = await readEmployees();
    const nextEmployees = employees.filter((employee) => employee.id !== id);

    if (nextEmployees.length === employees.length) {
      const error = new Error('Employee not found.');
      error.statusCode = 404;
      throw error;
    }

    await writeEmployees(nextEmployees);
  },
};
