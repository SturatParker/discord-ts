import { Message } from 'discord.js';
import {
  ArgumentCollectorResult,
  Command,
  CommandoClient,
  CommandoMessage,
} from 'discord.js-commando';

export default class HelloCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'hello',
      group: 'foo',
      memberName: 'hello',
      description: 'Replies with world',
    });
  }
  public run(
    message: CommandoMessage,
    args: string | object | string[],
    fromPattern: boolean,
    result?: ArgumentCollectorResult<object>
  ): Promise<Message | Message[]> {
    return message.say('world');
    // throw new Error('Method not implemented.');
  }
}
