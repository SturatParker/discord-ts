import { Guild } from 'discord.js';
import { GuildModel } from '../database/collections/guild/guild.model';
import { XClientEventListener } from '../common';

export const onGuildCreate: XClientEventListener<'guildCreate'> = async (
  guild: Guild
) => {
  GuildModel.findOne({ guildId: guild.id })
    .then((res) => res || GuildModel.create({ guildId: guild.id }))
    .then((res) => {
      console.log(`Joined guild ${guild.name}`);
    });
};
