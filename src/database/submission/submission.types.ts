import { Document, Model } from 'mongoose';
import { IChannelDocument } from '../channel/channel.types';
import { IGuarded, Reference } from '../guard';

export interface ISubmission {
  adminMessageId: string;
  publicMessageId: string;
  artist?: string;
  album?: string;
  genre?: string;
  channel: Reference<IChannelDocument>;
}

export interface ISubmissionDocument extends ISubmission, Document, IGuarded {}

export interface ISubmissionModel extends Model<ISubmissionDocument> {}
