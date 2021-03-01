import { Message, MessageEmbed, MessageEmbedOptions } from 'discord.js';
import {
  ArgumentCollectorResult,
  Command,
  CommandoClient,
  CommandoMessage,
} from 'discord.js-commando';

export default class HelloCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'helloname',
      group: 'foo',
      memberName: 'hellomembername',
      description: 'Replies with world',
    });
  }
  public run(
    message: CommandoMessage,
    args: string | object | string[],
    fromPattern: boolean,
    result?: ArgumentCollectorResult<object>
  ): Promise<Message | Message[]> {
    const a: MessageEmbedOptions = {};
    return message.embed(new MessageEmbed({ description: 'World' }));
    // return message.say('world');
    // throw new Error('Method not implemented.');
  }
}
