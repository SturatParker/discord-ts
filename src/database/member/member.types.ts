import { Document, Model } from 'mongoose';

export interface IMember {
  memberId: string;
  cancelVoteCounter: number;
}

export interface IMemberDocument extends IMember, Document {
  cancelVote: (this: IMemberDocument) => Promise<IMemberDocument>;
}

export interface IMemberModel extends Model<IMemberDocument> {}
