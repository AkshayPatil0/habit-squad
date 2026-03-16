import mongoose, { Document } from "mongoose";
export interface IUserDocument extends Document {
    name: string;
    email: string;
    password: string;
    avatar: string;
    xp: number;
    coins: number;
    groups: mongoose.Types.ObjectId[];
    createdAt: Date;
    comparePassword(candidate: string): Promise<boolean>;
}
export declare const User: mongoose.Model<IUserDocument, {}, {}, {}, mongoose.Document<unknown, {}, IUserDocument, {}, {}> & IUserDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=User.d.ts.map