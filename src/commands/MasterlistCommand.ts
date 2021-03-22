import { Message } from 'discord.js';
import { AbstractCommand } from '../common';
import { ChannelModel, IChannelDocument } from '../database';

export class MasterlistCommand extends AbstractCommand {
  constructor() {
    super({
      name: 'masterlist',
      execute(message: Message) {
        return ChannelModel.find().then((docs: IChannelDocument[]) => {
          let replyString = docs.map((doc) => doc.channelId).join('\n');
          return message.reply(`\n` + replyString);
        });
      },
    });
  }
}

export const masterlistCommand = new MasterlistCommand();
