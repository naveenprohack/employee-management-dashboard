export function validateLogin(values) {
  const errors = {};

  if (!values.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
    errors.email = 'Enter a valid email address.';
  }

  if (!values.password) {
    errors.password = 'Password is required.';
  } else if (values.password.length < 6) {
    errors.password = 'Password must be at least 6 characters.';
  }

  return errors;
}

export function validateEmployee(values) {
  const errors = {};

  if (!values.name.trim()) errors.name = 'Employee name is required.';
  if (!values.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
    errors.email = 'Enter a valid email address.';
  }
  if (!values.department) errors.department = 'Department is required.';
  if (!values.designation.trim()) errors.designation = 'Designation is required.';
  if (!values.status) errors.status = 'Status is required.';
  if (!values.joiningDate) errors.joiningDate = 'Joining date is required.';

  return errors;
}
