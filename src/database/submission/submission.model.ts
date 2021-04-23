import { model } from 'mongoose';
import { SubmissionSchema } from './submission.schema';
import { ISubmissionDocument, ISubmissionModel } from './submission.types';

export const SubmissionModel = model<ISubmissionDocument, ISubmissionModel>(
  'submission',
  SubmissionSchema
);
