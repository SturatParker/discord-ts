import { GuildModel } from '../database/collections/guild/guild.model';
import { Message } from 'discord.js';
import { AbstractCommand, XClient } from '../common';

export class PrefixCommand extends AbstractCommand {
  constructor() {
    super({
      name: 'prefix',
      permissions: ['MANAGE_GUILD'],
      arguments: [{ type: 'string', token: 'new_prefix' }],
    });
  }

  async run(
    message: Message,
    client: XClient,
    args: string[]
  ): Promise<Message> {
    const newPrefix = args[0];
    return newPrefix
      ? this.setPrefix(message, newPrefix)
      : this.getPrefix(message, client);
  }

  private async getPrefix(message: Message, client: XClient): Promise<Message> {
    const guildModel = await GuildModel.findOne({
      guildId: message.guild.id,
    });
    return message.reply(
      `I respond to commands prefixed with \`${
        guildModel?.commandPrefix ?? client.options.prefix
      }\`, or messages that mention me directly, e.g. \`<@${
        client.user.id
      }> help\``
    );
  }
  private async setPrefix(message: Message, prefix: string): Promise<Message> {
    const res = await GuildModel.findOneAndUpdate(
      { guildId: message.guild.id },
      { commandPrefix: prefix },
      { upsert: true, useFindAndModify: true }
    );
    return message.reply(`Command prefix set to ${prefix}`);
  }
}

export const prefixCommand = new PrefixCommand();
