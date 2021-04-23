import { Document, Model, Schema } from 'mongoose';

export interface IBaseChannel {
  adminChannelId: string;
  publicChannelId: string;
  isTracked: boolean;
  maxVotes: number;
  maxOwnVotes: number;
  submissions: Schema.Types.ObjectId[];
}

export interface IChannelDocument extends IBaseChannel, Document {
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
