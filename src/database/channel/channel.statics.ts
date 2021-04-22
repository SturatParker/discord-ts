import { IChannelModel, IChannelDocument } from './channel.types';

export function findOneOrCreate(
  this: IChannelModel,
  adminChannelId: string
): Promise<IChannelDocument> {
  return this.findOne({ adminChannelId: adminChannelId })
    .exec()
    .then(
      (record: IChannelDocument) => record ?? this.create({ adminChannelId })
    );
}

export function findByTracked(
  this: IChannelModel,
  isTracked: boolean
): Promise<IChannelDocument[]> {
  return this.find({ isTracked: isTracked }).exec();
}

export function findByPublicChannelId(
  this: IChannelModel,
  publicChannelId: string
): Promise<IChannelDocument> {
  return this.findOne({ publicChannelId }).exec();
}

export function findByAdminChannelId(
  this: IChannelModel,
  adminChannelId: string
): Promise<IChannelDocument> {
  return this.findOne({ adminChannelId }).exec();
}
