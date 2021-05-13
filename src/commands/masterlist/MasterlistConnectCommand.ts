import { Message } from 'discord.js';
import { AbstractCommand, XClient, Util } from '../../common';
import { ChannelModel } from '../../database/collections/channel';

export class MasterlistConnectCommand extends AbstractCommand {
  async run(
    message: Message,
    client: XClient,
    args: string[]
  ): Promise<Message> {
    args[0] = args[0].replace(/\D/g, '');
    args[1] = args[1].replace(/\D/g, '');
    let channel = await ChannelModel.findOne({ adminChannelId: args[0] });
    if (channel) {
      return message.reply(channel.connectionString());
    }
    channel = await ChannelModel.create({
      adminChannelId: args[0],
      publicChannelId: args[1],
      isTracked: true,
    });
    return message.reply(channel.connectionString());
  }
  constructor() {
    super({
      name: 'connect',
      arguments: [
        { token: '#adminChannel', type: 'string', required: true },
        { token: '#publicChannel', type: 'string', required: true },
      ],
    });
  }
}

export const masterlistConnectCommand = new MasterlistConnectCommand();
