import { Schema, model, Document, Types, PaginateModel} from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collection = "users";

interface IUser extends Document {
  email: string;
  password: string;
  avatar?: string;
  username: string;
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
      default:
        "https://t3.ftcdn.net/jpg/05/87/76/66/360_F_587766653_PkBNyGx7mQh9l1XXPtCAq1lBgOsLl6xH.jpg",
    },
    username: { type: String, required: true, unique: true },
    favorite: [
      {
        type: Types.ObjectId,
        ref: "music"
      }
    ],
    my_music: [
      {
        type: Types.ObjectId,
        ref: "music"
      }
    ],
    playlists: [
      {
        type: Types.ObjectId,
        ref: "playlist"
      }
    ],
    albums: [
      {
        type: Types.ObjectId,
        ref: "album"
      }
    ],
    events: [
      {
        type: Types.ObjectId,
        ref: "events"
      }
    ],
  },
  { timestamps: true }
);

userSchema.plugin(mongoosePaginate);

const User = model<IUser, PaginateModel<IUser>>(collection, userSchema);

export default User;
