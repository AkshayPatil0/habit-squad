import mongoose, { Document } from 'mongoose';
export interface IHabitCompletionDocument extends Document {
    habitId: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    groupId: mongoose.Types.ObjectId;
    completedAt: Date;
}
export declare const HabitCompletion: mongoose.Model<IHabitCompletionDocument, {}, {}, {}, mongoose.Document<unknown, {}, IHabitCompletionDocument, {}, {}> & IHabitCompletionDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=HabitCompletion.d.ts.map