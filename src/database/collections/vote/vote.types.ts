import { Document, Model } from 'mongoose';
import { ISubmissionDocument } from '../submission';
import { IChannelDocument } from '../channel';
import { IMemberDocument } from '../member';
import { IGuarded, Reference } from '../../shared';

export interface IVote {
  member: Reference<IMemberDocument>;
  submission: Reference<ISubmissionDocument>;
  channel: Reference<IChannelDocument>;
}

export interface IVoteDocument extends IVote, Document, IGuarded {
  canVoteInChannel: (
    this: IVoteDocument,
    channel: Reference<IChannelDocument>
  ) => Promise<boolean>;
}

export interface IVoteModel extends Model<IVoteDocument> {}
