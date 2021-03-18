import { Env } from './env';
import { XClient } from '../common';

export const CLIENTSERVICE: XClient = new XClient({
  prefix: Env.prefix(),
  owner: Env.owner(),
  guildId: Env.guildId(),
  adminChannelId: Env.adminChannelId(),
  partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'USER'],
});
