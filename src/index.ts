import express from 'express';
import { Client } from 'discord.js';
import { Global } from './global';
import { Env } from './env'


const app = express();
const port = 8080;
const client: Client = Global.client();
const token: string = Env.token();
// const token: string =
//   'ODE0NTU2MDUxMzA3MzY0NDAz.YDfkcA.QGyyBG1orhlmAyPlLtohpcayno4';
client.login(token);

app.get('/', (req, res) => {
  res.send('Hello Word');
});

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});

client.on('ready', () => {
  console.log(`Client ready as ${client.user}`);
});

client.on('message', (message) => {
  if (message.content == 'ping') {
    message.reply('pong');
  }
});
