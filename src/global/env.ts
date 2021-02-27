import { config } from 'dotenv';
config();

export namespace Env {
  export function token(): string {
    return process.env.TOKEN;
  }
  export function owner(): string {
    return process.env.OWNER;
  }
  export function prefix(): string {
    return process.env.PREFIX;
  }
}
