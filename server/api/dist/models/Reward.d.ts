import mongoose, { Document } from 'mongoose';
export interface IRewardDocument extends Document {
    name: string;
    cost: number;
    groupId: mongoose.Types.ObjectId;
    createdBy: mongoose.Types.ObjectId;
}
export declare const Reward: mongoose.Model<IRewardDocument, {}, {}, {}, mongoose.Document<unknown, {}, IRewardDocument, {}, {}> & IRewardDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=Reward.d.ts.map