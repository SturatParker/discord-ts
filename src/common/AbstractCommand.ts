import { Collection, Message, PermissionString } from 'discord.js';
import { XClient } from '.';

export interface ICommandOptions {
  name: string;
  permissions?: PermissionString[];
  subCommands?: AbstractCommand[];
  arguments?: IArgument[];
}

export abstract class AbstractCommand implements ICommandOptions {
  private _subcommands: Collection<string, AbstractCommand> = new Collection<
    string,
    AbstractCommand
  >();

  public readonly name: string;
  public readonly permissions: PermissionString[];
  public readonly subCommands: AbstractCommand[];
  public readonly arguments: IArgument[];

  protected readonly minArgCount: number;

  constructor(private options: ICommandOptions) {
    this.name = options.name;
    this.permissions = options.permissions ?? [];
    this.subCommands = options.subCommands ?? [];
    this.arguments = options.arguments ?? [];

    options.subCommands?.forEach((command) =>
      this._subcommands.set(command.name, command)
    );
    const optionalIndex = options.arguments?.findIndex(
      (argument) => !argument.required
    );
    this.minArgCount = optionalIndex == -1 ? 0 : optionalIndex;
  }
  execute(
    message: Message,
    client: XClient,
    payload: string[]
  ): Promise<Message> {
    if (payload.length && this._subcommands.has(payload[0])) {
      let subcommand = payload.shift();
      return this._subcommands
        .get(subcommand)
        .execute(message, client, payload);
    }
    const payloadError = this.getPayloadError(payload);
    if (payloadError) {
      return message.reply(payloadError);
    }
    return this.run(message, client, payload);
  }

  protected getPayloadError(payload: string[]): string {
    if (payload.length < this.minArgCount) {
      return `Missing required arguments. Expected: ${this.options.arguments
        .map((a) => `\`${a.token}\``)
        .join(', ')}`;
    }
    return;
  }

  abstract run(
    message: Message,
    client: XClient,
    args: string[]
  ): Promise<Message>;

  // get name(): string {
  //   return this.options.name;
  // }
}

export interface CommandConstructor {
  new (client: XClient): AbstractCommand;
}

export interface IArgument {
  token: string;
  type: 'string' | 'boolean' | 'number';
  required?: boolean;
}
