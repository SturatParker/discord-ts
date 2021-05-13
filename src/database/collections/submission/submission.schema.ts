import {} from './submission.methods';

import { GuardSchema, reference } from '../../shared';
import {
  ISubmission,
  ISubmissionDocument,
  ISubmissionModel,
} from './submission.types';

export const SubmissionSchema = new GuardSchema<
  ISubmissionDocument,
  ISubmissionModel,
  ISubmission
>({
  adminMessageId: String,
  publicMessageId: String,
  artist: String,
  album: String,
  genre: String,
  channel: reference('channel'),
});
