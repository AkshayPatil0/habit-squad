import mongoose, { Document } from 'mongoose';
export interface IGroupDocument extends Document {
    name: string;
    inviteCode: string;
    createdBy: mongoose.Types.ObjectId;
    members: mongoose.Types.ObjectId[];
    createdAt: Date;
}
export declare const Group: mongoose.Model<IGroupDocument, {}, {}, {}, mongoose.Document<unknown, {}, IGroupDocument, {}, {}> & IGroupDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=Group.d.ts.map