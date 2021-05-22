import { Message, MessageEmbed } from 'discord.js';
import { AbstractCommand, XClient } from '../common';

export class HelpCommand extends AbstractCommand {
  constructor() {
    super({
      name: 'help',
    });
  }

  run(message: Message, client: XClient, args: string[]): Promise<Message> {
    const desc = `\`\`\`${client.commandHandler.commands
      .map((command) => `${client.options.prefix}${command.name}`)
      .join(`\n`)}\`\`\``;
    const embed = new MessageEmbed({
      description: desc,
    });
    return message.reply(embed);
  }
}

export const helpCommand = new HelpCommand();
