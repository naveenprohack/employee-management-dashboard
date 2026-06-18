export function filterEmployees(employees, { query, department, status }) {
  const normalizedQuery = query.trim().toLowerCase();

  return employees.filter((employee) => {
    const matchesQuery =
      !normalizedQuery ||
      employee.name.toLowerCase().includes(normalizedQuery) ||
      employee.email.toLowerCase().includes(normalizedQuery);
    const matchesDepartment = department === 'All' || employee.department === department;
    const matchesStatus = status === 'All' || employee.status === status;

    return matchesQuery && matchesDepartment && matchesStatus;
  });
}
