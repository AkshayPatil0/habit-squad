import mongoose, { Document } from 'mongoose';
export interface IRewardRedemptionDocument extends Document {
    rewardId: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    redeemedAt: Date;
}
export declare const RewardRedemption: mongoose.Model<IRewardRedemptionDocument, {}, {}, {}, mongoose.Document<unknown, {}, IRewardRedemptionDocument, {}, {}> & IRewardRedemptionDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=RewardRedemption.d.ts.map