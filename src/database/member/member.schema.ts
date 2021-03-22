import { Schema } from 'mongoose';
import { resetCancelVotes } from './member.statics';
import { cancelVote } from './member.methods';

export const MemberSchema = new Schema({
  memberId: String,
  cancelVoteCounter: Number,
})
  .static('resetCancelVotes', resetCancelVotes)
  .method('cancelVote', cancelVote);
