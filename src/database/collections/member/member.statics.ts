import { IMemberModel, IMemberDocument } from '.';

export function resetCancelVotes(this: IMemberModel) {
  return this.updateMany({}, { cancelVoteCounter: 0 });
}
