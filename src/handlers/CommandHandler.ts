import { Collection, Message } from 'discord.js';
import {
  AbstractClientEventHandler,
  AbstractCommand,
  XClient,
} from '../common';

export class CommandHandler extends AbstractClientEventHandler<'message'> {
  private _commands: Collection<string, AbstractCommand> = new Collection<
    string,
    AbstractCommand
  >();

  constructor(client: XClient) {
    super('message', client);
  }

  listener(message: Message): void {
    if (message.author.bot) return;
    if (!message.content.startsWith(this.client.options.prefix)) return;
    console.log(`Testing ${message.content} for a command`);
    let content: string = message.content.slice(
      this.client.options.prefix.length
    );
    let payload: string[] = content.split(' ');
    let commandAttempt = payload.shift().toLocaleLowerCase();
    let command = this._commands.get(commandAttempt);
    if (!command) return;

    command.execute(message, payload);
  }

  register(commands: AbstractCommand[]): this {
    commands.forEach((command) => this._commands.set(command.name, command));
    return this;
  }

  get commands(): Collection<string, AbstractCommand> {
    return this._commands;
  }
}
