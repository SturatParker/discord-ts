import { Collection, Message, PermissionString } from 'discord.js';
import { XClient } from '.';

export interface CommandOptions {
  name: string;
  permissions?: PermissionString[];
  subCommands?: AbstractCommand[];
}

export abstract class AbstractCommand {
  private _subcommands: Collection<string, AbstractCommand> = new Collection<
    string,
    AbstractCommand
  >();
  constructor(private options: CommandOptions) {
    options.subCommands?.forEach((command) =>
      this._subcommands.set(command.name, command)
    );
  }
  execute(
    message: Message,
    client: XClient,
    payload: string[]
  ): Promise<Message> {
    if (payload.length && this._subcommands.has(payload[0])) {
      let subcommand = payload.shift();
      return this._subcommands.get(subcommand).run(message, client, payload);
    }
    return this.run(message, client, payload);
  }

  abstract run(
    message: Message,
    client: XClient,
    args: string[]
  ): Promise<Message>;

  get name(): string {
    return this.options.name;
  }
}

export interface CommandConstructor {
  new (client: XClient): AbstractCommand;
}
