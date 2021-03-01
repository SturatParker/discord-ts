import { Message } from 'discord.js';
import {
  ArgumentCollectorResult,
  Command,
  CommandoClient,
  CommandoMessage,
} from 'discord.js-commando';

export default class RandomCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'random',
      aliases: ['r'],
      group: 'util',
      memberName: 'random',
      description: 'Random number generator',
      args: [
        {
          key: 'a',
          prompt: 'Lower bound',
          type: 'integer',
          default: 0,
        },
        {
          key: 'b',
          prompt: 'Upper bound',
          type: 'integer',
        },
      ],
    });
  }
  public run(
    message: CommandoMessage,
    args: { a: number; b: number },
    fromPattern: boolean,
    result?: ArgumentCollectorResult<object>
  ): Promise<Message | Message[]> {
    let output = Math.random();
    return message.say(`${output}`);
    // throw new Error('Method not implemented.');
  }
}
