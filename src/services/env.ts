import { config } from 'dotenv';
config();

export interface IEnv {
  readonly token: string;
  readonly ownerId: string;
  readonly defaultPrefix: string;
  readonly homeGuildId: string;
  readonly homeChannelId: string;
  readonly databaseURI: string;
}

export class Env implements IEnv {
  private _DISCORD_TOKEN: string;
  private _OWNER_ID: string;
  private _DEFAULT_PREFIX: string;
  private _HOME_GUILD_ID: string;
  private _HOME_CHANNEL_ID: string;
  private _DATABASE_URI: string;

  constructor(env: NodeJS.ProcessEnv = process.env) {
    config();
    this._DISCORD_TOKEN = env.DISCORD_TOKEN;
    this._OWNER_ID = env.OWNER_ID;
    this._DEFAULT_PREFIX = env.DEFAULT_PREFIX ?? '~';
    this._HOME_GUILD_ID = env.HOME_GUILD_ID;
    this._HOME_CHANNEL_ID = env.HOME_CHANNEL_ID;

    this._DATABASE_URI = env.DATABASE_URI;
  }

  get token(): string {
    return this._DISCORD_TOKEN;
  }

  get ownerId(): string {
    return this._OWNER_ID;
  }

  get defaultPrefix(): string {
    return this._DEFAULT_PREFIX;
  }

  get homeGuildId(): string {
    return this._HOME_GUILD_ID;
  }

  get homeChannelId(): string {
    return this._HOME_CHANNEL_ID;
  }

  get databaseURI(): string {
    return this._DATABASE_URI;
  }
}

export const ENV = new Env();
