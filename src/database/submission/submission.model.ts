import { model } from 'mongoose';
import { SubmissionSchema } from '.';
import { ISubmissionDocument } from '.';

export const SubmissionModel = model<ISubmissionDocument>(
  'submission',
  SubmissionSchema
);
