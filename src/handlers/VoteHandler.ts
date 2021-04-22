import { MessageReaction, User, PartialUser } from 'discord.js';
import { AbstractClientEventHandler } from '../common';
import { ChannelModel } from '../database/channel';

export class VoteHandler extends AbstractClientEventHandler<'messageReactionAdd'> {
  public readonly emoji = ['👍', '👍🏻', '👍🏼', '👍🏽', '👍🏾', '👍🏿'];

  constructor() {
    super('messageReactionAdd');
  }

  async listener(
    messageReaction: MessageReaction,
    user: User | PartialUser
  ): Promise<void> {
    if (this.emoji.every((e) => e != messageReaction.emoji.name)) {
      return;
    }
    const channel = await ChannelModel.findByPublicChannelId(
      messageReaction.message.channel.id
    );
    if (!channel) {
      return;
    }
    throw new Error('Method not implemented.');
  }
}
