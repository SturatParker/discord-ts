import { Client } from "discord.js";

export namespace Global {
    let _client: Client
    export function client(): Client {
        if (!_client) {
            _client = new Client()
        }
        return _client
    }
}