import { Document, Model, Schema } from 'mongoose';
import { TChannel } from '../channel';
import { IGuarded } from '../guard';

export interface ISubmission {
  adminMessageId: string;
  publicMessageId: string;
  artist?: string;
  album?: string;
  genre?: string;
  channel: TChannel;
}

export interface ISubmissionDocument extends ISubmission, Document, IGuarded {}

export type TSubmission = Schema.Types.ObjectId | ISubmissionDocument;

export interface ISubmissionModel extends Model<ISubmissionDocument> {}
