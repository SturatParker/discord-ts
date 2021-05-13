import { Document, Model } from 'mongoose';
import { IGuarded, Reference } from '../../shared';
import { IChannelDocument } from '../channel';

export interface IGuild {
  guildId: string;
  logChannelId: string;
  commandPrefix: string;
  channels: Reference<IChannelDocument>;
}

export interface IGuildDocument extends IGuild, Document, IGuarded {}

export interface IGuildModel extends Model<IGuildDocument> {}
