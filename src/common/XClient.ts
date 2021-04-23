import {
  Client,
  ClientOptions,
  ClientEvents,
  Guild,
  TextChannel,
  Collection,
} from 'discord.js';
import { CommandHandler, SubmissionSync } from '../handlers';
import {
  AbstractClientEventHandler,
  XClientEventListener,
  XClientEvents,
} from '.';

export interface XClientOptions extends ClientOptions {
  prefix: string;
  owner?: string;
  guildId: string;
  adminChannelId: string;
}

export class XClient extends Client {
  options: XClientOptions;
  handlers: Collection<
    keyof XClientEvents,
    AbstractClientEventHandler<any>
  > = new Collection<keyof XClientEvents, AbstractClientEventHandler<any>>();

  private _commandHandler: CommandHandler;
  private _submissionSync: SubmissionSync;

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

  get commandHandler(): CommandHandler {
    return this._commandHandler;
  }
  set commandHandler(value: CommandHandler) {
    this._commandHandler?.detachClient();
    this._commandHandler = value;
    this._commandHandler.attachClient(this);
  }

  set submissionSync(value: SubmissionSync) {
    this._submissionSync?.detachClient();
    this._submissionSync = value;
    this._submissionSync.attachClient(this);
  }

  attachHandler<T extends keyof XClientEvents>(
    event: T,
    handler: AbstractClientEventHandler<T>
  ): this {
    this.handlers.get(event)?.detachClient();
    this.handlers.set(event, handler);
    handler.attachClient(this);
    return this;
  }

  attachHandlers(handlers: XClientEventHandlers): this {
    for (let handler in handlers) {
      let key: keyof XClientEvents = handler as keyof XClientEvents;
      this.attachHandler(key, handlers[key]);
    }
    return this;
  }
}

export type XClientEventHandlers = {
  [key in keyof XClientEvents]?: AbstractClientEventHandler<key>;
};
