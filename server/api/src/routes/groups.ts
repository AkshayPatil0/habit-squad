import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import {
  createGroup,
  joinGroup,
  getGroup,
  getGroupMembers,
} from '../controllers/groupController';

const router = Router();

router.post('/', authenticate, createGroup);
router.post('/join', authenticate, joinGroup);
router.get('/:groupId', authenticate, getGroup);
router.get('/:groupId/members', authenticate, getGroupMembers);

export default router;
