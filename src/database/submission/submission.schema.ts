import {} from './submission.methods';

import { GuardSchema, reference } from '../guard';
import {
  ISubmission,
  ISubmissionDocument,
  ISubmissionModel,
} from './submission.types';
import { ChannelModel } from '../channel/channel.model';
import { Schema } from 'mongoose';

const schemaDefinition = {
  adminMessageId: String,
  publicMessageId: String,
  artist: String,
  album: String,
  genre: String,
  // channel: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'channel',
  // },
  channel: reference(ChannelModel),
};

export const SubmissionSchema = new GuardSchema<
  ISubmissionDocument,
  ISubmissionModel
  // ISubmission
>(schemaDefinition);
