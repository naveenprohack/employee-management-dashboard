import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js';
import employeeRoutes from './routes/employeeRoutes.js';
import { initializeFileStore } from './repositories/fileEmployeeStore.js';
import { seedEmployeesIfEmpty } from './seed/seedEmployees.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/employee_management';
let storageMode = 'mongodb';

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
    credentials: true,
  }),
);
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', storage: storageMode });
});

app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);

app.use((err, _req, res, _next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    message: err.message || 'Internal server error.',
  });
});

mongoose
  .connect(mongoUri, { serverSelectionTimeoutMS: 5000 })
  .then(async () => {
    await seedEmployeesIfEmpty();
    app.listen(port, () => {
      console.log(`API server running on http://localhost:${port}/api`);
      console.log('Storage mode: MongoDB');
    });
  })
  .catch(async (error) => {
    storageMode = 'file';
    await initializeFileStore();
    app.listen(port, () => {
      console.warn(`MongoDB unavailable: ${error.message}`);
      console.warn('Storage mode: local JSON file fallback');
      console.log(`API server running on http://localhost:${port}/api`);
    });
  });
