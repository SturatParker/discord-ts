import { Schema } from 'mongoose';
import { findOneOrCreate, findByTracked } from './channel.statics';
import { toggleIsTracked, sameMaxVotes } from './channel.methods';

export const ChannelSchema = new Schema({
  channelId: String,
  isTracked: Boolean,
  maxVotes: Number,
  maxOwnVotes: Number,
})
  .static('findOneOrCreate', findOneOrCreate)
  .static('findByTracked', findByTracked)
  .method('toggleIsTracked', toggleIsTracked)
  .method('sameMaxVotes', sameMaxVotes);

export default ChannelSchema;
