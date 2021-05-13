import { resetCancelVotes } from './member.statics';
import { cancelVote } from './member.methods';
import { GuardSchema, reference } from '../../shared';
import { IMember, IMemberDocument, IMemberModel } from './member.types';

export const MemberSchema = new GuardSchema<
  IMemberDocument,
  IMemberModel,
  IMember
>({
  memberId: String,
  votes: [reference('vote')],
  cancelVoteCounter: Number,
})
  .static('resetCancelVotes', resetCancelVotes)
  .method('cancelVote', cancelVote);
