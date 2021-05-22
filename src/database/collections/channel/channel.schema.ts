import {
  findOneOrCreate,
  findByTracked,
  findByPublicChannelId,
  findByAdminChannelId,
} from './channel.statics';
import {
  toggleIsTracked,
  sameMaxVotes,
  connectionString,
  roulette,
  top,
} from './channel.methods';
import { GuardSchema, reference } from '../../shared/guard';
import { IChannelDocument, IChannelModel, IChannel } from './channel.types';

export const ChannelSchema = new GuardSchema<
  IChannelDocument,
  IChannelModel,
  IChannel
>({
  adminChannelId: String,
  publicChannelId: String,
  isTracked: Boolean,
  maxVotes: Number,
  maxOwnVotes: Number,
  submissions: [reference('submission')],
  guild: reference('guild'),
})
  .static('findOneOrCreate', findOneOrCreate)
  .static('findByTracked', findByTracked)
  .static('findByPublicChannelId', findByPublicChannelId)
  .static('findByAdminChannelId', findByAdminChannelId)
  .method('toggleIsTracked', toggleIsTracked)
  .method('sameMaxVotes', sameMaxVotes)
  .method('connectionString', connectionString)
  .method('roulette', roulette)
  .method('top', top);

export default ChannelSchema;
