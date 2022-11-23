import {Schema, Types, model} from 'mongoose';

/**
 * This interface is where the Account schema is based from
 */
interface AccountInterface {
  username: string,
  accountName: string,
  description: string,
  email: string,
  posts: Types.ObjectId[];
  likedPosts: Types.ObjectId[];
}


const AccountSchema = new Schema<AccountInterface>({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  accountName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  description: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  posts: [
    {
      type: Schema.Types.ObjectId, ref: 'Post',
    },
  ],
  likedPosts: [
    {
      type: Schema.Types.ObjectId, ref: 'Post',
    },
  ],
});

/**
 * The final model for the Account database
 */
 export const Account = model<AccountInterface>('Account', AccountSchema);