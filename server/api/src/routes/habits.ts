import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import {
  createHabit,
  getGroupHabits,
  getUserHabits,
  completeHabit,
} from '../controllers/habitController';

const router = Router();

router.post('/', authenticate, createHabit);
router.get('/groups/:groupId/habits', authenticate, getGroupHabits);
router.get('/users/:userId/habits', authenticate, getUserHabits);
router.post('/:habitId/complete', authenticate, completeHabit);

export default router;
