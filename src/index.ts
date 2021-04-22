import { CLIENTSERVICE, Env, DATABASE_SERVICE } from './services';
import { CommandHandler } from './handlers';

import {
  pingCommand,
  masterlistCommand,
  permissionsCommand,
  helpCommand,
} from './commands';
import { onReady, onGuildMemberAdd, onError, onGuildMemberRemove } from './on';

import { dummyChannelData } from './scripts/dummyChannelData';
import { ChannelModel } from './database';

DATABASE_SERVICE.connection.once('open', () => {
  console.log('Connected to database');
});

CLIENTSERVICE.commandHandler = new CommandHandler().register([
  helpCommand,
  pingCommand,
  masterlistCommand,
  permissionsCommand,
]);
CLIENTSERVICE.on('ready', onReady)
  .on('error', onError)
  .on('guildMemberAdd', onGuildMemberAdd)
  .on('guildMemberRemove', onGuildMemberRemove);

CLIENTSERVICE.on('messageReactionAdd', async (messageReaction, user) => {
  console.log(`Detected: ${messageReaction.emoji.name}`);
  if (messageReaction.emoji.name !== '👍') return;
  let channel = await ChannelModel.findOne({
    publicChannelId: messageReaction.message.channel.id,
  });
  if (!channel) return;
  messageReaction.remove();
  CLIENTSERVICE.emit('submissionVoteAdd', messageReaction, user);
});

CLIENTSERVICE.on('submissionVoteAdd', console.log);

DATABASE_SERVICE.connect(Env.databaseURI())
  .then(() => {
    return CLIENTSERVICE.login(Env.token());
  })
  .then(() => {
    //----- Scripts -----//
    // return dummyChannelData();
  });
