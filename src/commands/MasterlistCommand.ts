import { Message } from 'discord.js';
import { AbstractCommand, XClient, Util } from '../common';
import { ChannelModel, IChannelDocument } from '../database';
import { masterlistAddCommand, masterlistRemoveCommand } from './masterlist';

export class MasterlistCommand extends AbstractCommand {
  run(message: Message, client: XClient, args: string[]): Promise<Message> {
    return ChannelModel.find().then((docs: IChannelDocument[]) => {
      let replyString = docs
        .map((doc) => Util.channelMention(doc.channelId))
        .join('\n');
      return message.reply(`\n` + replyString);
    });
  }

  constructor() {
    super({
      name: 'masterlist',
      subCommands: [masterlistAddCommand, masterlistRemoveCommand],
    });
  }
}

export const masterlistCommand = new MasterlistCommand();
