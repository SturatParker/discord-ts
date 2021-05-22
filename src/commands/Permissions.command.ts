import { Message } from 'discord.js';
import { AbstractCommand, XClient } from '../common';

export class PermissionsCommand extends AbstractCommand {
  run(message: Message, client: XClient, args: string[]): Promise<Message> {
    return message.reply(message.member.permissions.toArray());
  }
  constructor() {
    super({
      name: 'permissions',
    });
  }
}

export const permissionsCommand = new PermissionsCommand();
