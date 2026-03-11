import mongoose, { Document, Schema } from 'mongoose';

export interface IRewardDocument extends Document {
  name: string;
  cost: number;
  groupId: mongoose.Types.ObjectId;
  createdBy: mongoose.Types.ObjectId;
}

const RewardSchema = new Schema<IRewardDocument>(
  {
    name: { type: String, required: true, trim: true },
    cost: { type: Number, required: true, min: 0 },
    groupId: { type: Schema.Types.ObjectId, ref: 'Group', required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

export const Reward = mongoose.model<IRewardDocument>('Reward', RewardSchema);
