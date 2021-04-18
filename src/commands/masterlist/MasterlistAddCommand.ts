import { Message } from 'discord.js';
import { AbstractCommand, XClient, Util } from '../../common';
import {
  ChannelModel,
  IChannel,
  IChannelDocument,
} from '../../database/channel';

export class MasterlistAddCommand extends AbstractCommand {
  run(message: Message, client: XClient, args: string[]): Promise<Message> {
    return ChannelModel.findOne({
      channelId: message.channel.id,
    }).then((channel) => {
      if (channel) {
        return message.reply(
          `${Util.channelMention(channel.channelId)} is already a master list`
        );
      } else {
        return ChannelModel.create({
          channelId: message.channel.id,
          isTracked: true,
        }).then((channel) => {
          return message.reply(
            `${Util.channelMention(channel.channelId)} added`
          );
        });
      }
    });
  }
  constructor() {
    super({
      name: 'add',
    });
  }
}

export const masterlistAddCommand = new MasterlistAddCommand();
