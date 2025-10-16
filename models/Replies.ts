import mongoose, { Model, models, Schema } from "mongoose";

type ReplyType = {
  content: string;
  userId: mongoose.ObjectId;
  replyTo: mongoose.ObjectId;
  commentId: mongoose.ObjectId;
  productRequestId: string;
} & Document;

const replySchema = new Schema<ReplyType>(
  {
    content: {
      type: String,
      required: [true, "Reply can't be empty"],
    },

    replyTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    commentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      required: true,
    },

    productRequestId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Reply: Model<ReplyType> =
  models.Reply || mongoose.model<ReplyType>("Reply", replySchema);

export default Reply;
