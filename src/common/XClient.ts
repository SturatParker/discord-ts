import {
  Client,
  ClientOptions,
  ClientEvents,
  Guild,
  TextChannel,
} from 'discord.js';
import { XClientEventListener, XClientEvents } from '.';

export interface XClientOptions extends ClientOptions {
  prefix: string;
  owner?: string;
  guildId: string;
  adminChannelId: string;
}

export class XClient extends Client {
  options: XClientOptions;
  constructor(options?: XClientOptions) {
    super(options);
    this.options = { ...options, ...this.options };
  }

  emit<K extends keyof XClientEvents>(
    event: K,
    ...args: XClientEvents[K]
  ): boolean;
  emit<K extends keyof ClientEvents>(
    event: K,
    ...args: ClientEvents[K]
  ): boolean {
    return super.emit(event, ...args);
  }
  // emit<S extends string | symbol>(event: Exclude<S, keyof ClientEvents>, ...args: any[]): boolean;

  on<K extends keyof XClientEvents>(
    event: K,
    listener: XClientEventListener<K>
  ): this;
  on<K extends keyof ClientEvents>(
    event: K,
    listener: XClientEventListener<K>
  ): this {
    return super.on(event, listener);
  }

  get guild(): Guild {
    return this.guilds.cache.get(this.options.guildId);
  }

  get adminChannelId(): string {
    return this.options.adminChannelId;
  }
  get adminChannel(): TextChannel {
    let channel = this.channels.cache.get(this.adminChannelId);
    return channel.type == 'text' ? (channel as TextChannel) : undefined;
  }
}
