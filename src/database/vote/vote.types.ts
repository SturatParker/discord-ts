import { Document, Model } from 'mongoose';
import { ISubmissionDocument } from '../submission';
import { IChannelDocument } from '../channel';
import { IMemberDocument } from '../member';
import { IGuarded, Reference } from '../guard';

export interface IVote {
  member: Reference<IMemberDocument>;
  submission: Reference<ISubmissionDocument>;
  channel: Reference<IChannelDocument>;
}

export interface IVoteDocument extends IVote, Document, IGuarded {}

export interface IVoteModel extends Model<IVoteDocument> {}
