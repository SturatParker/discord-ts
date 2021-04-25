import { Document, Model, Schema } from 'mongoose';
import { IGuarded, Reference } from '../guard';
import { ISubmissionDocument } from '../submission/submission.types';

export interface IChannel {
  adminChannelId: string;
  publicChannelId: string;
  isTracked: boolean;
  maxVotes: number;
  maxOwnVotes: number;
  submissions: Reference<ISubmissionDocument>[];
}

export interface IChannelDocument extends IChannel, Document, IGuarded {
  toggleIsTracked: (this: IChannelDocument) => Promise<void>;
  sameMaxVotes: (this: IChannelDocument) => Promise<IChannelDocument[]>;
  connectionString: (this: IChannelDocument) => string;
}

export interface IChannelModel extends Model<IChannelDocument> {
  findOneOrCreate: (
    this: IChannelModel,
    publicChannelId: string
  ) => Promise<IChannelDocument>;
  findByTracked: (
    this: IChannelModel,
    isTracked: boolean
  ) => Promise<IChannelDocument[]>;
  findByPublicChannelId: (
    this: IChannelModel,
    publicChannelId: string
  ) => Promise<IChannelDocument>;
  findByAdminChannelId: (
    this: IChannelModel,
    adminChannelId: string
  ) => Promise<IChannelDocument>;
}
