import {Document, Schema, model} from 'mongoose';

/**
 * This interface is where the Post schema is based from
 */
interface PostDocumentInterface extends Document {
  title: string,
  content: string,
  accountName: string,
  profilePicture: string,
  likesFromAccounts: string[],
  tags: string[]
}

const PostSchema = new Schema<PostDocumentInterface>({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  accountName: {
    type: String,
    required: true,
    trim: true,
  },
  profilePicture: {
    type: String,
    default: "",
  },
  likesFromAccounts: [
    {
      type: String,
    },
  ],
  tags: [
    {
      type: String,
      trim: true,
      enum: [
        "Science", "Computers", "Gaming", "Sports", "Music",
      ],
    }
  ]
});

/**
 * The final model for the Post database
 */
export const Post = model<PostDocumentInterface>('Post', PostSchema);