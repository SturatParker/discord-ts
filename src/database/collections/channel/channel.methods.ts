import { Util } from '../../../common';
import { ISubmissionDocument } from '../submission';
import { VoteModel } from '../vote';
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

export async function top(
  this: IChannelDocument,
  count: number
): Promise<ISubmissionDocument[]> {
  await this.populate('submissions')
    .populate('submissions.votes')
    .execPopulate();
  return (this.submissions as ISubmissionDocument[])
    .sort((a, b) => a.voteCount - b.voteCount)
    .slice(0, Math.floor(count));
}

export async function roulette(
  this: IChannelDocument
): Promise<ISubmissionDocument> {
  let votes = await VoteModel.find({ channel: this._id });
  let count = votes.length;
  let randomIndex = Math.floor(Math.random() * count);
  let winner = votes[randomIndex];
  await winner.populate('submission');
  if (winner.guard(winner.submission)) {
    return winner.submission;
  }
}
