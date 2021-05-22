import { ENV } from './env';
import { XClient } from '../common';
import { onError, onGuildMemberAdd, onGuildMemberRemove, onReady } from '../on';

export const CLIENTSERVICE: XClient = new XClient({
  prefix: ENV.defaultPrefix,
  owner: ENV.ownerId,
  guildId: ENV.homeGuildId,
  adminChannelId: ENV.homeChannelId,
  partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'USER'],
})
  .on('ready', onReady)
  .on('error', onError)
  .on('guildMemberAdd', onGuildMemberAdd)
  .on('guildMemberRemove', onGuildMemberRemove);
