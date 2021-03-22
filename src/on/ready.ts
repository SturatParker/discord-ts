import { CLIENTSERVICE } from '../services/client';
import { XClientEventListener } from '../common';

export const onReady: XClientEventListener<'ready'> = () => {
  console.log(`Client ready as ${CLIENTSERVICE.user.tag}`);
};
