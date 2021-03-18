import { CLIENTSERVICE } from '../services/client';
import { ClientEventListener } from '../common';

export const onReady: ClientEventListener<'ready'> = () => {
  console.log(`Client ready as ${CLIENTSERVICE.user.tag}`);
};
