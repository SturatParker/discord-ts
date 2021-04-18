import { IChannelModel, IChannelDocument } from './channel.types';

export function findOneOrCreate(
  this: IChannelModel,
  channelId: string
): Promise<IChannelDocument> {
  return this.findOne({ channelId })
    .exec()
    .then((record: IChannelDocument) => record ?? this.create({ channelId }));
}

export function findByTracked(
  this: IChannelModel,
  isTracked: boolean
): Promise<IChannelDocument[]> {
  return this.find({ isTracked: isTracked }).exec();
}
