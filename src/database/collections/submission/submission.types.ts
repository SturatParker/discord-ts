import { Document, Model } from 'mongoose';
import { IChannelDocument } from '../channel/channel.types';
import { IGuarded, Reference } from '../../shared';
import { IVoteDocument } from '../vote/vote.types';

export interface ISubmission {
  adminMessageId: string;
  publicMessageId: string;
  artist?: string;
  album?: string;
  genre?: string;
  channel: Reference<IChannelDocument>;
  votes: Reference<IVoteDocument>[];
  voteCount: number;
}

export interface ISubmissionDocument extends ISubmission, Document, IGuarded {}

export interface ISubmissionModel extends Model<ISubmissionDocument> {}
