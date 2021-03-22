import { Document, Model } from 'mongoose';

export interface IChannel {
  channelId: string;
  isTracked: boolean;
  maxVotes: number;
  maxOwnVotes: number;
}

export interface IChannelDocument extends IChannel, Document {
  toggleIsTracked: (this: IChannelDocument) => Promise<void>;
  sameMaxVotes: (this: IChannelDocument) => Promise<IChannelDocument[]>;
}

export interface IChannelModel extends Model<IChannelDocument> {
  findOneOrCreate: (
    this: IChannelModel,
    channelId: string
  ) => Promise<IChannelDocument>;
  findByTracked: (
    this: IChannelModel,
    isTracked: boolean
  ) => Promise<IChannelDocument[]>;
}
