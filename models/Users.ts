import mongoose, { Model, models, Schema } from "mongoose";

type UserType = {
  image?: string;
  name: string;
  email: string;
  password?: string;
} & Document;

const userSchema = new Schema<UserType>(
  {
    image: String,

    name: { type: String, required: [true, "Please enter your name"] },

    email: {
      type: String,
      unique: true,
      required: [true, "Please enter a valid username"],
    },
    password: {
      type: String,
      min: [6, "Must be at least 6, got {VALUE}"],
    },
  },
  {
    timestamps: true,
  },
);

const User: Model<UserType> =
  models?.User || mongoose.model<UserType>("User", userSchema);

export default User;
