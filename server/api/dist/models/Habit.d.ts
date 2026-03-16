import mongoose, { Document } from 'mongoose';
export type HabitType = 'daily' | 'weekly' | 'times_per_week' | 'one_time';
export interface IHabitDocument extends Document {
    name: string;
    type: HabitType;
    frequency: number;
    xpReward: number;
    coinReward: number;
    createdBy: mongoose.Types.ObjectId;
    groupId: mongoose.Types.ObjectId | null;
    createdAt: Date;
}
export declare const Habit: mongoose.Model<IHabitDocument, {}, {}, {}, mongoose.Document<unknown, {}, IHabitDocument, {}, {}> & IHabitDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=Habit.d.ts.map