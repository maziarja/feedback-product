import mongoose, { Model, models, Schema } from "mongoose";

type CommentType = {
  content: string;
  userId: mongoose.ObjectId;
  productRequestId: mongoose.ObjectId;
} & Document;

const commentSchema = new Schema<CommentType>(
  {
    content: {
      type: String,
      required: [true, "Comment can't be empty"],
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Comment must have userId"],
    },

    productRequestId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductRequest",
      required: true,
    },
  },
  {
    timestamps: true,
    // toJSON: { virtuals: true },
    // toObject: { virtuals: true },
  },
);

// This creates a virtual field `replies` that links to Reply model
commentSchema.virtual("replies", {
  ref: "Reply",
  localField: "_id",
  foreignField: "commentId",
});

const Comment: Model<CommentType> =
  models.Comment || mongoose.model<CommentType>("Comment", commentSchema);

export default Comment;
