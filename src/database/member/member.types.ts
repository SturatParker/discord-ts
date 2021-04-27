import { Document, Model } from 'mongoose';
import { IGuarded, Reference } from '../guard';
import { IVoteDocument } from '../vote';

export interface IMember {
  memberId: string;
  votes: Reference<IVoteDocument>[];
  cancelVoteCounter: number;
}

export interface IMemberDocument extends IMember, Document, IGuarded {
  cancelVote: (this: IMemberDocument) => Promise<IMemberDocument>;
}

export interface IMemberModel extends Model<IMemberDocument> {}
