import { DataService, IEnv } from './services';
import { CommandHandler, SubmissionSync } from './handlers';

import {
  pingCommand,
  masterlistCommand,
  permissionsCommand,
  helpCommand,
  prefixCommand,
} from './commands';

import { dummyChannelData } from './scripts/dummyChannelData';
import { ChannelModel } from './database';
import { XClient } from './common';

export class Main {
  static _instance: Main;
  constructor(
    private readonly dataSvc: DataService,
    private readonly client: XClient,
    private readonly env: IEnv
  ) {
    this.client.submissionSync = new SubmissionSync();
    this.client.commandHandler = new CommandHandler().register([
      helpCommand,
      pingCommand,
      masterlistCommand,
      permissionsCommand,
      prefixCommand,
    ]);

    this.dataSvcHandlers();
    this.clientHandlers();
  }

  private dataSvcHandlers() {}

  private clientHandlers() {
    this.client.on('messageReactionAdd', async (messageReaction, user) => {
      console.log(`Detected: ${messageReaction.emoji.name}`);
      if (messageReaction.emoji.name !== '👍') return;
      let channel = await ChannelModel.findOne({
        publicChannelId: messageReaction.message.channel.id,
      });
      if (!channel) return;
      messageReaction.remove();
      this.client.emit('submissionVoteAdd', messageReaction, user);
    });

    this.client.on('submissionVoteAdd', console.log);
  }

  private async run() {
    try {
      await this.dataSvc.connect(this.env.databaseURI);
      await this.client.login(this.env.token);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async launch(dataSvc: DataService, client: XClient, env: IEnv) {
    if (!this._instance) {
      this._instance = new Main(dataSvc, client, env);
    }
    return this._instance.run();
  }

  static get instance(): Main {
    return this._instance;
  }
}
