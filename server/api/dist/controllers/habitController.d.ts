import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
export declare const createHabit: (req: AuthRequest, res: Response) => Promise<void>;
export declare const getGroupHabits: (req: AuthRequest, res: Response) => Promise<void>;
export declare const getUserHabits: (req: AuthRequest, res: Response) => Promise<void>;
export declare const completeHabit: (req: AuthRequest, res: Response) => Promise<void>;
//# sourceMappingURL=habitController.d.ts.map