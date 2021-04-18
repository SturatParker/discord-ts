import { XClientEvents } from '.';
import { XClient } from './XClient';

export abstract class AbstractClientEventHandler<
  T extends keyof XClientEvents
> {
  protected client: XClient;

  constructor(protected event: T) {}

  abstract listener(...args: XClientEvents[T]): void;

  attachClient(client: XClient): this {
    if (this.client) {
      this.detachClient();
    }
    this.client = client.on(this.event, this.listener.bind(this));
    return this;
  }
  detachClient() {
    this.client.removeListener(this.event, this.listener.bind(this));
    this.client = undefined;
  }
}
