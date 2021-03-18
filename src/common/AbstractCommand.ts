import { Message } from 'discord.js';

export interface CommandOptions {
  name: string;
  execute(message: Message, payload: string[]): Promise<Message>;
}

export abstract class AbstractCommand {
  constructor(private options: CommandOptions) {}
  execute(message: Message, payload: string[]): Promise<Message> {
    return this.options.execute(message, payload);
  }
  get name(): string {
    return this.options.name;
  }
}
