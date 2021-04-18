import { Message } from 'discord.js';
import { AbstractCommand, XClient } from '../common';

export class HelpCommand extends AbstractCommand {
  constructor() {
    super({
      name: 'help',
    });
  }

  run(message: Message, client: XClient, args: string[]): Promise<Message> {
    return message.reply('Method not implemented.');
  }
}

export const helpCommand = new HelpCommand();
