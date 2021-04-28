import { Message, PartialMessage, TextChannel } from 'discord.js';
import { ChannelModel, ISubmission, SubmissionModel } from '../database';
import { XClient } from '../common';

export class SubmissionSync {
  messageHandler: any;
  messageUpdateHandler: any;
  messageDeleteHandler: any;
  private _client: XClient;

  attachClient(client: XClient) {
    this._client = client
      .on('message', this.onMessage)
      .on('messageUpdate', this.onMessageUpdate)
      .on('messageDelete', this.onMessageDelete);
  }

  detachClient() {
    this._client
      .removeListener('message', this.onMessage)
      .removeListener('messageUpdate', this.onMessageUpdate)
      .removeListener('messageDelete', this.onMessageDelete);
  }

  private async onMessage(message: Message | PartialMessage): Promise<void> {
    const channel = await ChannelModel.findByAdminChannelId(message.channel.id);
    if (!channel) return;
    const publicChannel = (await message.client.channels.fetch(
      channel.publicChannelId
    )) as TextChannel;
    if (!publicChannel) return;
    const publicMessage = await publicChannel.send(message.content);
    const newSubmission: ISubmission = {
      adminMessageId: message.id,
      publicMessageId: publicMessage.id,
      channel: channel._id,
      votes: [],
      voteCount: 0,
    };
    const record = await SubmissionModel.create(newSubmission);
    channel.submissions.push(record._id);
    await channel.save();
    await message.react('✅');
    return;
  }

  private async onMessageUpdate(
    oldMessage: Message | PartialMessage,
    newMessage: Message | PartialMessage
  ): Promise<void> {
    const submission = await SubmissionModel.findOne({
      adminMessageId: newMessage.id,
    }).populate('channel');
    if (!submission) return;

    if (submission.guard(submission.channel)) {
      const publicChannel = (await oldMessage.client.channels.fetch(
        submission.channel.publicChannelId
      )) as TextChannel;
      const publicMesage = await publicChannel.messages.fetch(
        submission.publicMessageId
      );
      publicMesage.edit(newMessage.content);
    }
  }

  private async onMessageDelete(
    message: Message | PartialMessage
  ): Promise<void> {
    const submission = await SubmissionModel.findOne({
      adminMessageId: message.id,
    }).populate('channel');
    if (!submission) return;
    if (submission.guard(submission.channel)) {
      const publicChannel = (await message.client.channels.fetch(
        submission.channel.publicChannelId
      )) as TextChannel;
      const publicMessage = await publicChannel.messages.fetch(
        submission.publicMessageId
      );
      await publicMessage.delete();
      await submission.channel.updateOne({
        $pull: { submissions: { _id: submission._id } },
      });
      await submission.remove();
    }
  }
}
