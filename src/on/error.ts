import { XClientEventListener } from '../common';

export const onError: XClientEventListener<'error'> = (error: Error): void => {
  console.log(error);
};
