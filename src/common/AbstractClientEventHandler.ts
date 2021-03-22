import { ClientEvents } from 'discord.js';
import { XClient } from './XClient';

export abstract class AbstractClientEventHandler<T extends keyof ClientEvents> {
  constructor(event: T, protected client: XClient) {
    client.on(event, this.listener.bind(this));
  }

  abstract listener(...args: ClientEvents[T]): void;
}
