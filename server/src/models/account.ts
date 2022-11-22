import {Document, Schema, model} from 'mongoose';
import {PostDocumentInterface} from './post';

/**
 * This interface is where the Account schema is based from
 */
 export interface AccountDocumentInterface extends Document {
  username: string,
  accountName: string,
  description: string,
  email: string,
  posts: PostDocumentInterface[],
  likedPosts: PostDocumentInterface[]
}


const AccountSchema = new Schema<AccountDocumentInterface>({
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
 export const Account = model<AccountDocumentInterface>('Account', AccountSchema);