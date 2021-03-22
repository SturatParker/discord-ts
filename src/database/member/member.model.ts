import { model } from 'mongoose';
import { MemberSchema } from './member.schema';
import { IMemberDocument } from './member.types';

export const MemberModel = model<IMemberDocument>('member', MemberSchema);
