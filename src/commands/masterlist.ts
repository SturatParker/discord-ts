import { Message } from 'discord.js';
import {
  ArgumentCollectorResult,
  Command,
  CommandoClient,
  CommandoMessage,
} from 'discord.js-commando';
export default class MasterlistCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'masterlist',
      group: 'list',
      memberName: 'masterlist',
      description: 'Control masterlists',
    });
  }
  public run(
    message: CommandoMessage,
    args: string | object | string[],
    fromPattern: boolean,
    result?: ArgumentCollectorResult<object>
  ): Promise<Message | Message[]> {
    throw new Error('Method not implemented.');
  }
}
