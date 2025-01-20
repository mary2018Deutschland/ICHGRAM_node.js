import { Schema, model, Document, Types } from "mongoose";
import { IUser } from "./User";
export interface IUserProfile extends Document {
  user: IUser | Types.ObjectId;
  avatar: String;
  avatarContentType?: string;
  bio: string;
  gender: "male" | "female" | "other";
  address: {
    city?: string;
    state?: string;
    country?: string;
  };
  interests: string[];
  occupation?: string; // Job
  education?: string;
  followers: Types.ObjectId[]; // followers
  following: Types.ObjectId[]; // following
  followersCount: number;
  followingCount: number;
  repostedPosts: Types.ObjectId[];
}

const userProfileSchema = new Schema<IUserProfile>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    avatar: { type: String },
    avatarContentType: { type: String },
    bio: { type: String, default: "" },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      default: "other",
    },
    address: {
      city: { type: String },
      state: { type: String },
      country: { type: String },
    },
    interests: [{ type: String }],
    occupation: { type: String },
    education: { type: String },
    followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: Schema.Types.ObjectId, ref: "User" }],
    followersCount: { type: Number, default: 0 },
    followingCount: { type: Number, default: 0 },
    repostedPosts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  },
  { timestamps: true }
);

const UserProfile = model<IUserProfile>("UserProfile", userProfileSchema);

export default UserProfile;
