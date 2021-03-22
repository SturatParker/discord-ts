import { ChannelModel } from './channel.model';
import { IChannelDocument } from './channel.types';

export async function toggleIsTracked(
  this: IChannelDocument,
  state?: boolean
): Promise<void> {
  this.isTracked = state ?? !this.isTracked;
  await this.save();
}

export async function sameMaxVotes(
  this: IChannelDocument
): Promise<IChannelDocument[]> {
  return ChannelModel.find({ maxVotes: this.maxVotes });
}
