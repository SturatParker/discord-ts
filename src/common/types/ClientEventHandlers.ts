import { ClientEvents } from 'discord.js';
import { AbstractClientEventHandler } from '../AbstractClientEventHandler';

export type ClientEventHandlers = {
  [key in keyof ClientEvents]?: AbstractClientEventHandler<key>;
};
