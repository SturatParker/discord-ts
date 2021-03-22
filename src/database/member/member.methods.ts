import { MemberModel, IMemberDocument } from '.';

export function cancelVote(this: IMemberDocument): Promise<IMemberDocument> {
  this.cancelVoteCounter++;
  return this.save();
}
