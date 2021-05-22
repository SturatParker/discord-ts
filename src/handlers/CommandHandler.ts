import { GuildModel } from '../database/collections/guild/guild.model';
import { Collection, Message } from 'discord.js';
import { AbstractClientEventHandler, AbstractCommand } from '../common';

export class CommandHandler extends AbstractClientEventHandler<'message'> {
  private _commands: Collection<string, AbstractCommand> = new Collection<
    string,
    AbstractCommand
  >();

  constructor() {
    super('message');
  }

  async listener(message: Message): Promise<void> {
    if (message.author.bot) return;
    const invocationMethod = await this.getInvokationMethod(message);
    if (!invocationMethod) return;
    console.log(`Testing ${message.content} for a command`);
    let content: string = message.content.slice(invocationMethod.length);
    let payload: string[] = this.tokenise(content);
    let commandAttempt = payload.shift().toLocaleLowerCase();
    let command = this._commands.get(commandAttempt);
    if (!command) return;

    command.execute(message, this.client, payload);
  }

  register(commands: AbstractCommand[]): this {
    commands.forEach((command) => this._commands.set(command.name, command));
    return this;
  }

  get commands(): Collection<string, AbstractCommand> {
    return this._commands;
  }

  async getInvokationMethod(message: Message): Promise<string> {
    const guildModel = await GuildModel.findOne({ guildId: message.guild.id });
    const prefix = guildModel?.commandPrefix ?? this.client.options.prefix;
    const invocationMethods = [
      prefix,
      `<@${message.client.user.id}>`,
      `<@${message.client.user.id}> `,
    ];
    const invocationMethod = invocationMethods.find((method) =>
      message.content.startsWith(method)
    );
    return invocationMethod;
  }

  private tokenise(content: string): string[] {
    const regexp = /("[^"]+")|([^\\\s"]+)/g;
    return content.match(regexp).map((s) => s.replace(/\\\s*"\\\s*/g, ''));
  }
}
