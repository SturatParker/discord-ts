import { Message } from 'discord.js';
import { AbstractCommand } from '../common';

export class PingCommand extends AbstractCommand {
  constructor() {
    super({
      name: 'ping',
      execute(message: Message) {
        return message.reply('pong');
      },
    });
  }
}

export const pingCommand = new PingCommand();
