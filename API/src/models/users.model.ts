import { Schema, model, Document, Types } from "mongoose";

const collection = "users";

export interface IUser extends Document {
  _id: Types.ObjectId;
  email: string;
  password: string;
  avatar?: string;
  username: string;
  name:string;
  last_name:string;
  favorite: Types.ObjectId[];
  my_music: Types.ObjectId[];
  playlists: Types.ObjectId[];
  albums: Types.ObjectId[];
  events: Types.ObjectId[];
}

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    avatar: {
      type: String,
      default: "https://t3.ftcdn.net/jpg/05/87/76/66/360_F_587766653_PkBNyGx7mQh9l1XXPtCAq1lBgOsLl6xH.jpg",
    },
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    last_name: { type: String, required: true },
    favorite: [{ type: Types.ObjectId, ref: "music" }],
    my_music: [{ type: Types.ObjectId, ref: "music" }],
    playlists: [{ type: Types.ObjectId, ref: "playlist" }],
    albums: [{ type: Types.ObjectId, ref: "album" }],
    events: [{ type: Types.ObjectId, ref: "events" }],
  },
  { timestamps: true }
);

const User = model<IUser>(collection, userSchema);

export default User;