import { Document, Model } from 'mongoose';
import { IGuarded, Reference } from '../../shared';
import { IChannelDocument } from '../channel';
import { IMemberDocument } from '../member';

export interface IGuild {
  guildId: string;
  logChannelId: string;
  commandPrefix: string;
  channels: Reference<IChannelDocument>;
  members: Reference<IMemberDocument>;
}

export interface IGuildDocument extends IGuild, Document, IGuarded {}

export interface IGuildModel extends Model<IGuildDocument> {}
