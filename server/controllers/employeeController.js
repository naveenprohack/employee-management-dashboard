import { Employee } from '../models/Employee.js';
import { fileEmployeeStore } from '../repositories/fileEmployeeStore.js';

const isMongoConnected = () => Employee.db.readyState === 1;

export async function listEmployees(_req, res, next) {
  try {
    if (!isMongoConnected()) {
      const employees = await fileEmployeeStore.list();
      return res.json(employees);
    }

    const employees = await Employee.find().sort({ joiningDate: -1, createdAt: -1 });
    return res.json(employees);
  } catch (error) {
    return next(error);
  }
}

export async function createEmployee(req, res, next) {
  try {
    if (!isMongoConnected()) {
      const employee = await fileEmployeeStore.create(req.body);
      return res.status(201).json(employee);
    }

    const employee = await Employee.create(req.body);
    return res.status(201).json(employee);
  } catch (error) {
    if (error.code === 11000) {
      error.message = 'An employee with this email already exists.';
      error.statusCode = 409;
    }
    return next(error);
  }
}

export async function updateEmployee(req, res, next) {
  try {
    if (!isMongoConnected()) {
      const employee = await fileEmployeeStore.update(req.params.id, req.body);
      return res.json(employee);
    }

    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!employee) {
      const error = new Error('Employee not found.');
      error.statusCode = 404;
      throw error;
    }

    return res.json(employee);
  } catch (error) {
    if (error.code === 11000) {
      error.message = 'An employee with this email already exists.';
      error.statusCode = 409;
    }
    return next(error);
  }
}

export async function deleteEmployee(req, res, next) {
  try {
    if (!isMongoConnected()) {
      await fileEmployeeStore.remove(req.params.id);
      return res.status(204).send();
    }

    const employee = await Employee.findByIdAndDelete(req.params.id);

    if (!employee) {
      const error = new Error('Employee not found.');
      error.statusCode = 404;
      throw error;
    }

    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
}
