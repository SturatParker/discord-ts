import { CommandoClient } from 'discord.js-commando';
import { Env } from './env';
import HelloCommand from '../commands/hello';
import * as on from '../on';

export namespace Client {
  let client: CommandoClient;

  export function instance(): CommandoClient {
    return client ?? intialise();
  }

  function intialise(): CommandoClient {
    client = new CommandoClient({
      commandPrefix: Env.prefix(),
      owner: Env.owner(),
    });
    client.registry
      .registerDefaultTypes()
      .registerDefaultGroups()
      .registerGroups([['foo', 'Foo group']])
      .registerCommands([HelloCommand])
      .registerDefaultCommands();
    client.login(Env.token());

    client.on('ready', on.ready);
    client.on('message', on.message);
    client.on('error', on.error);
    return client;
  }
}
