import { Document, Model, Schema } from 'mongoose';

export interface IMember {
  memberId: string;
  cancelVoteCounter: number;
}

export interface IMemberDocument extends IMember, Document {
  cancelVote: (this: IMemberDocument) => Promise<IMemberDocument>;
}

export type TMember = Schema.Types.ObjectId | IMemberDocument;

export interface IMemberModel extends Model<IMemberDocument> {}
