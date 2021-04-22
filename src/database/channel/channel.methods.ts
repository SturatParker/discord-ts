import { Util } from '../../common';
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

export function connectionString(this: IChannelDocument): string {
  return `${Util.channelMention(
    this.adminChannelId
  )} is connected to ${Util.channelMention(this.publicChannelId)}`;
}
