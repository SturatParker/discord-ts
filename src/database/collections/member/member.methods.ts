import { isDocument, Reference } from '../../shared';

import { IMemberDocument } from './member.types';
import { ChannelModel } from '../channel/channel.model';
import { IChannelDocument } from '../channel/channel.types';
import { IVoteDocument } from '../vote/vote.types';

export function cancelVote(this: IMemberDocument): Promise<IMemberDocument> {
  this.cancelVoteCounter++;
  return this.save();
}

export async function canVoteInChannel(
  this: IMemberDocument,
  channel: Reference<IChannelDocument>
): Promise<boolean> {
  let channelDocument: IChannelDocument;
  let voteDocuments: IVoteDocument[];
  if (isDocument(channel)) {
    channelDocument = channel;
  } else {
    channelDocument = await ChannelModel.findById(channel);
  }
  if (!this.guardArray(this.votes)) {
    await this.populate('votes').execPopulate();
    voteDocuments = this.votes as IVoteDocument[];
  } else {
    voteDocuments = this.votes;
  }
  return true;
}
