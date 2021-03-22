import { model } from 'mongoose';
import { ChannelSchema } from './channel.schema';
import { IChannelDocument } from './channel.types';

export const ChannelModel = model<IChannelDocument>('channel', ChannelSchema);
