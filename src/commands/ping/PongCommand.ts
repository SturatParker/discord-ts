import { Message } from 'discord.js';
import { AbstractCommand, XClient } from '../../common';

export class PongCommand extends AbstractCommand {
  run(message: Message, client: XClient, args: string[]): Promise<Message> {
    return message.reply('pang');
  }
  constructor() {
    super({
      name: 'pong',
    });
  }
}

export const pongCommand = new PongCommand();
