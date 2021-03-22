import { IChannelModel, IChannelDocument } from './channel.types';

export async function findOneOrCreate(
  this: IChannelModel,
  channelId: string
): Promise<IChannelDocument> {
  const record = await this.findOne({ channelId });
  if (record) {
    return record;
  } else {
    return this.create({ channelId });
  }
}

export async function findByTracked(
  this: IChannelModel,
  isTracked: boolean
): Promise<IChannelDocument[]> {
  return this.find({ isTracked: isTracked });
}
