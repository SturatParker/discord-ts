import { Schema } from 'mongoose';

export const SubmissionSchema = new Schema({
  adminMessageId: String,
  publicMessageId: String,
  artist: String,
  album: String,
  genre: String,
  channel: {
    type: Schema.Types.ObjectId,
    ref: 'channel',
  },
});
