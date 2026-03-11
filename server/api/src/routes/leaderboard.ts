import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { getLeaderboard } from '../controllers/leaderboardController';

const router = Router();

router.get('/groups/:groupId/leaderboard', authenticate, getLeaderboard);

export default router;
