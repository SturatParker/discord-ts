import { GuardSchema, reference } from '../../shared';
import { IGuild, IGuildDocument, IGuildModel } from './guild.types';

export const GuildSchema = new GuardSchema<IGuildDocument, IGuildModel, IGuild>(
  {
    guildId: String,
    logChannelId: String,
    commandPrefix: String,
    channels: [reference('channel')],
  }
);