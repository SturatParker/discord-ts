import { Document, Model } from 'mongoose';

export interface IChannel {
  adminChannelId: string;
  publicChannelId: string;
  isTracked: boolean;
  maxVotes: number;
  maxOwnVotes: number;
}

export interface IChannelDocument extends IChannel, Document {
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
}
