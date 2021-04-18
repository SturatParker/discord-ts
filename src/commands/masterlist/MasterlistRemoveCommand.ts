import { Message } from 'discord.js';
import { AbstractCommand, XClient } from '../../common';

export class MasterlistRemoveCommand extends AbstractCommand {
  run(message: Message, client: XClient, args: string[]): Promise<Message> {
    throw new Error('Method not implemented.');
  }
  constructor() {
    super({
      name: 'remove',
    });
  }
}

export const masterlistRemoveCommand = new MasterlistRemoveCommand();
