import { Document, Model, Schema } from 'mongoose';
import { IChannelDocument, TChannel } from '../channel';
import { IGuarded } from '../guard';

export interface ISubmission {
  adminMessageId: string;
  publicMessageId: string;
  artist?: string;
  album?: string;
  genre?: string;
  channel: TChannel;
}

export interface ISubmissionDocument extends ISubmission, Document, IGuarded {
  isChannelPopulatedGuard: (
    this: ISubmissionDocument,
    channel: TChannel
  ) => channel is IChannelDocument;
}

export type TSubmission = Schema.Types.ObjectId | ISubmissionDocument;

export interface ISubmissionModel extends Model<ISubmissionDocument> {
  foo: () => {};
}
