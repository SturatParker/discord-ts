import { Message, TextChannel } from 'discord.js';
import { ChannelModel } from '../database/channel';
import { AbstractClientEventHandler, XClient } from '../common';
import { EventEmitter } from 'events';
export class SubmissionMessageHandler extends AbstractClientEventHandler<'message'> {
  constructor() {
    super('message');
  }

  async listener(message: Message): Promise<void> {
    const adminChannel = await ChannelModel.findByAdminChannelId(
      message.channel.id
    );
    if (!adminChannel) return;
    const publicChannel = (await message.client.channels.fetch(
      adminChannel.publicChannelId
    )) as TextChannel;
    if (!publicChannel) return;
    publicChannel.send(message.content);
    // throw new Error('Method not implemented.');
  }
}

export class SubmissionMessageUpdateHandler extends AbstractClientEventHandler<'messageUpdate'> {
  listener(args_0: Message): void {
    throw new Error('Method not implemented.');
  }
  constructor() {
    super('messageUpdate');
  }
}
export class SubmissionDeleteHandler extends AbstractClientEventHandler<'messageDelete'> {
  listener(args_0: Message): void {
    throw new Error('Method not implemented.');
  }
  constructor() {
    super('messageDelete');
  }
}

export class SubmissionSynchroniser extends EventEmitter {
  messageHandler: any;
  messageUpdateHandler: any;
  messageDeleteHandler: any;

  constructor(client: XClient) {
    super();
  }
}

export const submissionMessageHandler = new SubmissionMessageHandler();
