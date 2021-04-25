import { resetCancelVotes } from './member.statics';
import { cancelVote } from './member.methods';
import { GuardSchema } from '../guard';
import { IMember, IMemberDocument, IMemberModel } from './member.types';

export const MemberSchema = new GuardSchema<
  IMemberDocument,
  IMemberModel,
  IMember
>({
  memberId: String,
  cancelVoteCounter: Number,
})
  .static('resetCancelVotes', resetCancelVotes)
  .method('cancelVote', cancelVote);
