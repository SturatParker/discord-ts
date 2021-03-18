import { ClientEvents } from 'discord.js';

export type ClientEventListener<K extends keyof ClientEvents> = (
  ...args: ClientEvents[K]
) => void;
