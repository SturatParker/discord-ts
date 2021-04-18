import { Schema } from 'mongoose';

export const SubmissionSchema = new Schema({
  messageId: String,
  artist: String,
  album: String,
  genre: String,
});
