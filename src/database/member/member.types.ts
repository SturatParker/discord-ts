import { Document, Model } from 'mongoose';
import { IGuarded } from '../guard';

export interface IMember {
  memberId: string;
  cancelVoteCounter: number;
}

export interface IMemberDocument extends IMember, Document, IGuarded {
  cancelVote: (this: IMemberDocument) => Promise<IMemberDocument>;
}

export interface IMemberModel extends Model<IMemberDocument> {}
