import { MessageReaction, User, PartialUser } from 'discord.js';
import { AbstractClientEventHandler } from '../common';
import { SubmissionModel, ChannelModel } from '../database';

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
    if (!channel) return;
    const submission = await SubmissionModel.findOne({
      publicMessageId: messageReaction.message.id,
    });

    if (!submission) return;
    throw new Error('Method not implemented.');
  }
}
