import { Document, Model, Schema } from 'mongoose';
import { IChannelDocument, IChannelModel } from '../channel';

export interface ISubmission {
  adminMessageId: string;
  publicMessageId: string;
  artist?: string;
  album?: string;
  genre?: string;
  channel: Schema.Types.ObjectId | Record<string, unknown>;
}

export interface ISubmissionDocument extends ISubmission, Document {}

export interface ISubmissionModel extends Model<ISubmissionDocument> {}
