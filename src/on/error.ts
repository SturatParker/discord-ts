import { ClientEventListener } from '../common';

export const onError: ClientEventListener<'error'> = (error: Error): void => {
  console.log(error);
};
