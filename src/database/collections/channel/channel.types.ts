import { Document, Model } from 'mongoose';
import { IGuarded, Reference } from '../../shared';
import { IGuildDocument } from '../guild/guild.types';
import { ISubmissionDocument } from '../submission/submission.types';

export interface IChannel {
  adminChannelId: string;
  publicChannelId: string;
  isTracked: boolean;
  maxVotes: number;
  maxOwnVotes: number;
  submissions: Reference<ISubmissionDocument>[];
  guild: Reference<IGuildDocument>;
}

export interface IChannelDocument extends IChannel, Document, IGuarded {
  toggleIsTracked: (this: IChannelDocument) => Promise<void>;
  sameMaxVotes: (this: IChannelDocument) => Promise<IChannelDocument[]>;
  connectionString: (this: IChannelDocument) => string;
  top: (
    this: IChannelDocument,
    count: number
  ) => Promise<ISubmissionDocument[]>;
  roulette: (this: IChannelDocument) => Promise<ISubmissionDocument>;
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
