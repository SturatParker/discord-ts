import { GuardSchema, reference } from '../../shared';

import { IVote, IVoteDocument, IVoteModel } from './vote.types';

export const VoteSchema = new GuardSchema<IVoteDocument, IVoteModel, IVote>({
  member: reference('member'),
  submission: reference('submission'),
  channel: reference('channel'),
});
