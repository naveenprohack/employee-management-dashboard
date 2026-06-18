import { monthLabel } from './date.js';

export function buildEmployeeAnalytics(employees) {
  const totalEmployees = employees.length;
  const activeEmployees = employees.filter((employee) => employee.status === 'Active').length;
  const inactiveEmployees = totalEmployees - activeEmployees;

  const departmentMap = employees.reduce((acc, employee) => {
    acc[employee.department] = (acc[employee.department] || 0) + 1;
    return acc;
  }, {});

  const monthlyMap = employees.reduce((acc, employee) => {
    const label = monthLabel(employee.joiningDate);
    acc[label] = (acc[label] || 0) + 1;
    return acc;
  }, {});

  return {
    totalEmployees,
    activeEmployees,
    inactiveEmployees,
    departmentDistribution: Object.entries(departmentMap).map(([department, count]) => ({ department, count })),
    monthlyJoined: Object.entries(monthlyMap).map(([month, count]) => ({ month, count })),
    statusDistribution: [
      { name: 'Active', value: activeEmployees },
      { name: 'Inactive', value: inactiveEmployees },
    ],
  };
}
