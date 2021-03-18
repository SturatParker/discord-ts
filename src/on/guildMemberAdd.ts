import { GuildMember, MessageEmbed } from 'discord.js';
import { ClientEventListener } from '../common';
import { CLIENTSERVICE, EmbedColors } from '../services';
import dayjs from 'dayjs';

export const onGuildMemberAdd: ClientEventListener<'guildMemberAdd'> = (
  guildMember: GuildMember
): void => {
  const avatarURL =
    guildMember.user.avatarURL() ?? guildMember.user.defaultAvatarURL;
  const now = new Date(Date.now());
  const d1 = dayjs(now);
  const d2 = dayjs(guildMember.user.createdAt);
  const age = {
    years: d1.diff(d2, 'year'),
    months: d1.diff(d2, 'month') % 12,
    days: d1.diff(d2, 'days') % 365,
  };
  const ageString = `${age.years ? `${age.years} Years ` : ''}${
    age.months ? `${age.months} Months ` : ''
  }${age.days ? `${age.days} Days` : ''}`;
  dayjs().diff(d1);
  let embed = new MessageEmbed()
    .setAuthor('Member Joined', avatarURL)
    .setThumbnail(avatarURL)
    .setTimestamp(Date.now())
    .setDescription(
      `<@${guildMember.id}> ${guildMember.user.tag}
      
      **Account Age**
      ${ageString}
      `
    )
    .setColor(EmbedColors.success)
    .setFooter(`ID: ${guildMember.id}`);
  CLIENTSERVICE.adminChannel?.send(embed);
};
