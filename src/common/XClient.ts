import {
  Client,
  ClientOptions,
  ClientEvents,
  Guild,
  TextChannel,
} from 'discord.js';
import { ClientEventListener } from '.';

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
  on<K extends keyof ClientEvents>(
    event: K,
    listener: ClientEventListener<K>
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
