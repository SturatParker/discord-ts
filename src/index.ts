import { CLIENTSERVICE, Env } from './services';
import { pingCommand } from './commands';
import { onReady, onGuildMemberAdd, onError, onGuildMemberRemove } from './on';

import { CommandHandler } from './common';

const commandHandler = new CommandHandler(CLIENTSERVICE);
commandHandler.register([pingCommand]);

CLIENTSERVICE.on('ready', onReady);
CLIENTSERVICE.on('error', onError);
CLIENTSERVICE.on('guildMemberAdd', onGuildMemberAdd);
CLIENTSERVICE.on('guildMemberRemove', onGuildMemberRemove);

CLIENTSERVICE.login(Env.token());
