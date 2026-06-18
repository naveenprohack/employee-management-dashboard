import { Router } from 'express';
import {
  createEmployee,
  deleteEmployee,
  listEmployees,
  updateEmployee,
} from '../controllers/employeeController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = Router();

router.use(requireAuth);
router.get('/', listEmployees);
router.post('/', createEmployee);
router.put('/:id', updateEmployee);
router.delete('/:id', deleteEmployee);

export default router;
