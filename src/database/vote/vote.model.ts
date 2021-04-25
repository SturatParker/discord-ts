import { model } from 'mongoose';
import { VoteSchema } from './vote.schema';
import { IVoteDocument, IVoteModel } from './vote.types';

export const VoteModel = model<IVoteDocument, IVoteModel>('vote', VoteSchema);
