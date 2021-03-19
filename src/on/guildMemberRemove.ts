import { GuildMember, MessageEmbed, PartialGuildMember } from 'discord.js';
import { ClientEventListener } from '../common';
import { CLIENTSERVICE, EmbedColors } from '../services';

export const onGuildMemberRemove: ClientEventListener<'guildMemberRemove'> = (
  guildMember: GuildMember | PartialGuildMember
): void => {
  const avatarURL =
    guildMember.user?.avatarURL() ?? guildMember.user?.defaultAvatarURL;
  let embed = new MessageEmbed()
    .setAuthor('Member Left', avatarURL)
    .setThumbnail(avatarURL)
    .setTimestamp(Date.now())
    .setDescription(`<@${guildMember.id}> ${guildMember.user?.tag}`)
    .setColor(EmbedColors.error)
    .setFooter(`ID: ${guildMember.id}`);
  CLIENTSERVICE.adminChannel?.send(embed);
};
