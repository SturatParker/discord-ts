// import { Document, Model, model, Types, Schema, Query } from 'mongoose';
// import { Company } from './Company';

// // Schema
// const UserSchema = new Schema<UserDocument, UserModel>({
//   firstName: {
//     type: String,
//     required: true,
//   },
//   lastName: String,
//   username: {
//     type: String,
//     unique: true,
//     required: true,
//     lowercase: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   company: {
//     type: Schema.Types.ObjectId,
//     ref: 'Company',
//     required: true,
//   },
//   gender: {
//     type: Number,
//     enum: [0, 1],
//     default: 0,
//     required: true,
//   },
//   friends: [
//     {
//       type: String,
//     },
//   ],
//   creditCards: {
//     type: Map,
//     of: String,
//   },
// });

// enum Gender {
//   Male = 1,
//   Female = 0,
// }

// export interface User {
//   firstName: string;
//   lastName?: string;
//   username: string;
//   password: string;
//   company: Types.ObjectId | Record<string, unknown>;
//   gender: Gender;
//   friends: Array<string>;
//   creditCards?: Map<string, string>;
// }

// /**
//  * Not directly exported because it is not recommanded to
//  * use this interface direct unless necessary since the
//  * type of `company` field is not deterministic
//  */
// interface UserBaseDocument extends User, Document {
//   friends: Types.Array<string>;
//   creditCards?: Types.Map<string>;
//   fullName: string;
//   getGender(): string;
// }

// // Export this for strong typing
// export interface UserDocument extends UserBaseDocument {
//   company: Company['_id'];
// }

// // Export this for strong typing
// export interface UserPopulatedDocument extends UserBaseDocument {
//   company: Company;
// }

// // Virtuals
// UserSchema.virtual('fullName').get(function (this: UserBaseDocument) {
//   return this.firstName + this.lastName;
// });

// // Methods
// UserSchema.methods.getGender = function (this: UserBaseDocument) {
//   return this.gender > 0 ? 'Male' : 'Female';
// };

// // For model
// export interface UserModel extends Model<UserDocument> {
//   findMyCompany(id: string): Promise<UserPopulatedDocument>;
// }

// // Static methods
// UserSchema.statics.findMyCompany = async function (
//   this: Model<UserDocument>,
//   id: string
// ) {
//   return this.findById(id).populate('company').exec();
// };

// // Document middlewares
// UserSchema.pre<UserDocument>('save', function (next) {
//   if (this.isModified('password')) {
//     this.password = hashPassword(this.password);
//   }
// });

// // Query middlewares
// UserSchema.post<Query<UserDocument, UserDocument>>(
//   'findOneAndUpdate',
//   async function (doc) {
//     await updateCompanyReference(doc);
//   }
// );

// // Default export
// export default model<UserDocument, UserModel>('User', UserSchema);
