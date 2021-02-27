import { PresenceData } from 'discord.js';
import { Client } from '../global/client';

export default function () {
  console.log(`Client ready as ${Client.instance().user.tag}`);
  Client.instance().user.setActivity(Client.instance().commandPrefix);
  let a: PresenceData;
  // Client.instance().user.setPresence({
  //   activity: {
  //     name: 'foo',
  //     type: 'CUSTOM_STATUS',
  //   },
  // });
}
