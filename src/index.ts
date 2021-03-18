import { CLIENTSERVICE, Env } from './services';
import { pingCommand } from './commands';
import { onReady, onGuildMemberAdd, onError } from './on';

import { CommandHandler } from './common';

const commandHandler = new CommandHandler(CLIENTSERVICE);
commandHandler.register([pingCommand]);

CLIENTSERVICE.on('ready', onReady);
CLIENTSERVICE.on('guildMemberAdd', onGuildMemberAdd);
CLIENTSERVICE.on('error', onError);

CLIENTSERVICE.login(Env.token());
