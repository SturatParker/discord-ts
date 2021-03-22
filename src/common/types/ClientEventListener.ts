import { XClientEvents } from '..';

export type XClientEventListener<K extends keyof XClientEvents> = (
  ...args: XClientEvents[K]
) => void;
