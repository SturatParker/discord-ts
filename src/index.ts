import express from 'express';
import { Client } from 'discord.js';
import { CloneClient } from './singleton-test';

const app = express();
const port = 8080;
const client: Client = new Client();
const token: string =
  'ODE0NTU2MDUxMzA3MzY0NDAz.YDfkcA.QGyyBG1orhlmAyPlLtohpcayno4';
client.login(token);

app.get('/', (req, res) => {
  res.send('Hello Word');
});

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});

client.on('ready', () => {
  console.log(`Client ready as ${client.user}`);
  const clone = new CloneClient();
  console.log(`clone client is ${clone.user}`);
});

client.on('message', (message) => {
  if (message.content == 'ping') {
    message.reply('pong');
  }
});
