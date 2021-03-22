import { config } from 'dotenv';
config();

export namespace Env {
  export function token(): string {
    return process.env.TOKEN ?? 'foo';
  }
  export function owner(): string {
    return process.env.OWNER;
  }
  export function prefix(): string {
    return process.env.PREFIX;
  }

  export function adminChannelId(): string {
    return process.env.ADMIN_CHANNEL_ID;
  }

  export function guildId(): string {
    return process.env.GUILD_ID;
  }

  export function databaseURI(): string {
    return process.env.DATABASE_URI;
  }
}
