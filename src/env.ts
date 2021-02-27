import { config } from "dotenv"
config();

export namespace Env {
    export function token() : string {
        return process.env.TOKEN
    }
}