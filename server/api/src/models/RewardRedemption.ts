import mongoose, { Document, Schema } from 'mongoose';

export interface IRewardRedemptionDocument extends Document {
  rewardId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  redeemedAt: Date;
}

const RewardRedemptionSchema = new Schema<IRewardRedemptionDocument>({
  rewardId: { type: Schema.Types.ObjectId, ref: 'Reward', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  redeemedAt: { type: Date, default: Date.now },
});

export const RewardRedemption = mongoose.model<IRewardRedemptionDocument>(
  'RewardRedemption',
  RewardRedemptionSchema
);
