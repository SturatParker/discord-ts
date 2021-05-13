import { model } from 'mongoose';
import { GuildSchema } from './guild.schema';
import { IGuildDocument, IGuildModel } from './guild.types';

export const GuildModel = model<IGuildDocument, IGuildModel>(
  'guild',
  GuildSchema
);
