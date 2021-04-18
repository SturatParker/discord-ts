import {
  ClientEvents,
  MessageReaction,
  User,
  PartialUser,
  Message,
  PartialMessage,
} from 'discord.js';

export interface XClientEvents extends ClientEvents {
  submission: [Message];
  submissionDelete: [Message | PartialMessage];
  submissionUpdated: [Message | PartialMessage, Message | PartialMessage];
  submissionVoteAdd: [MessageReaction, User | PartialUser];
}
