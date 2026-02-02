import { Router } from 'express';
import {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  deleteAllTasks,
} from '../controllers/tasks.controller.js';

const router = Router();

router.get('/', getTasks);
router.get('/:id', getTask);
router.post('/', createTask);
router.patch('/:id', updateTask);
router.delete('/:id', deleteTask);
router.delete('/', deleteAllTasks);

export default router;
