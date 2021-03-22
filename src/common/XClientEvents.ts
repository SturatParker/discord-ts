import { ClientEvents, MessageReaction, User, PartialUser } from 'discord.js';

export interface XClientEvents extends ClientEvents {
  voteAdded: [MessageReaction, User | PartialUser];
}
