import { CLIENTSERVICE, Env, DATABASE_SERVICE } from './services/index';
import { CommandHandler } from './handlers';

import { pingCommand, masterlistCommand } from './commands';
import { onReady, onGuildMemberAdd, onError, onGuildMemberRemove } from './on';

import { dummyChannelData } from './scripts/dummyChannelData';

import Mongoose from 'mongoose';

DATABASE_SERVICE.connection.once('open', () => {
  console.log('Connected to database');
});

const commandHandler = new CommandHandler(CLIENTSERVICE);
commandHandler.register([pingCommand, masterlistCommand]);

CLIENTSERVICE.on('ready', onReady);
CLIENTSERVICE.on('error', onError);
CLIENTSERVICE.on('guildMemberAdd', onGuildMemberAdd);
CLIENTSERVICE.on('guildMemberRemove', onGuildMemberRemove);

CLIENTSERVICE.on('messageReactionAdd', (messageReaction, user) => {
  console.log(`Detected: ${messageReaction.emoji.name}`);
  if (messageReaction.emoji.name == '👍') {
    messageReaction.remove();
    // console.log('Creating collector');
    // const collector = messageReaction.message.createReactionCollector(
    //   () => true,
    //   {
    //     time: 15000,
    //   }
    // );

    // collector.once('collect', (messageReaction) => {
    //   console.log(`Collected: ${messageReaction.emoji.name}`);
    // });

    messageReaction.client.emit('voteAdded', messageReaction);
  }
});

CLIENTSERVICE.on<'voteAdded'>('voteAdded', console.log);
CLIENTSERVICE.on('voteAdded', console.log);

DATABASE_SERVICE.connect(Env.databaseURI())
  .then(() => {
    return CLIENTSERVICE.login(Env.token());
  })
  .then(() => {
    //----- Scripts -----//
    // return dummyChannelData();
  });
