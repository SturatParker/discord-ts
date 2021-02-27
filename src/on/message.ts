import { Message } from 'discord.js';

export default function (message: Message) {
  if (message.content == 'ping') {
    message.reply('pong');
  }
}
