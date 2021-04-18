import { Message } from 'discord.js';
import { AbstractCommand, XClient } from '../common';

import { pongCommand } from './ping/PongCommand';

export class PingCommand extends AbstractCommand {
  run(message: Message, client: XClient, args: string[]): Promise<Message> {
    return message.reply('pong');
  }
  constructor() {
    super({
      name: 'ping',
      subCommands: [pongCommand],
    });
  }
}

export const pingCommand = new PingCommand();
