import {Schema, Types, model} from 'mongoose';

/**
 * This interface is where the Account schema is based from
 */
interface AccountInterface {
  username: string,
  accountName: string,
  password: string,
  description: string,
  email: string,
  profilePicture: string,
  posts: Types.ObjectId[];
  likedPosts: Types.ObjectId[];
}


const AccountSchema = new Schema<AccountInterface>({
  username: {
    type: String,
    required: [true, 'A username is required'],
    trim: true,
  },
  accountName: {
    type: String,
    required: [true, 'An account name is required'],
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'An email is required'],
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'A password is required'],
    trim: true,
  },
  description: {
    type: String,
    default: "",
  },
  profilePicture: {
    type: String,
    default: "",
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