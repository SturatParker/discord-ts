import { Schema } from 'mongoose';
import {
  findOneOrCreate,
  findByTracked,
  findByPublicChannelId,
} from './channel.statics';
import {
  toggleIsTracked,
  sameMaxVotes,
  connectionString,
} from './channel.methods';

export const ChannelSchema = new Schema({
  adminChannelId: String,
  publicChannelId: String,
  isTracked: Boolean,
  maxVotes: Number,
  maxOwnVotes: Number,
})
  .static('findOneOrCreate', findOneOrCreate)
  .static('findByTracked', findByTracked)
  .static('findByPublicChannelId', findByPublicChannelId)
  .method('toggleIsTracked', toggleIsTracked)
  .method('sameMaxVotes', sameMaxVotes)
  .method('connectionString', connectionString);

export default ChannelSchema;
