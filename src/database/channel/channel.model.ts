import { model } from 'mongoose';
import { ChannelSchema } from './channel.schema';
import { IChannelDocument, IChannelModel } from './channel.types';

export const ChannelModel = model<IChannelDocument, IChannelModel>(
  'channel',
  ChannelSchema
);
