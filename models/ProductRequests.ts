import mongoose, { Model, models, Schema } from "mongoose";

type ProductRequestType = {
  title: string;
  category: "feature" | "UI" | "UX" | "enhancement" | "bug";
  status: "suggestion" | "planned" | "in-progress" | "live";
  upVotes: number;
  upvotedBy: string[];
  description: string;
  userId: mongoose.ObjectId;
  numOfComments: number;
} & Document;

const productRequestSchema = new Schema<ProductRequestType>(
  {
    title: { type: String, required: [true, "Feedback must have a title"] },

    category: {
      type: String,
      enum: ["feature", "UI", "UX", "enhancement", "bug"],
      required: [true, "Feedback must have a category"],
    },

    status: {
      type: String,
      enum: ["suggestion", "planned", "in-progress", "live"],
      default: "suggestion",
      required: [true, "Feedback must have a status"],
    },

    upVotes: {
      type: Number,
      required: true,
      default: 0,
    },

    upvotedBy: {
      type: [String],
      default: [],
      required: true,
    },

    description: {
      type: String,
      required: [true, "Feedback must have a description"],
    },
    numOfComments: {
      type: Number,
      required: true,
      default: 0,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
);

const ProductRequest: Model<ProductRequestType> =
  models.ProductRequest ||
  mongoose.model<ProductRequestType>("ProductRequest", productRequestSchema);

export default ProductRequest;
