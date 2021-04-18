import { Document, Model } from 'mongoose';

export interface ISubmission {
  messageId: string;
  artist: string;
  album: string;
  genre: string;
}

export interface ISubmissionDocument extends ISubmission, Document {}

export interface ISubmissionModel extends Model<ISubmissionDocument> {}
