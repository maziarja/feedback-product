import mongoose, { Model, models, Schema } from "mongoose";

type ProductRequestType = {
  title: string;
  category: "feature" | "UI" | "UX" | "enhancement" | "bug";
  status: "suggestion" | "planned" | "in-progress" | "live";
  upVotes: number;
  upvotedBy: string[];
  description: string;
  numOfComments: number;
  userId: mongoose.ObjectId;
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
    },

    upVotes: {
      type: Number,
      default: 0,
    },

    upvotedBy: {
      type: [String],
      default: [],
    },

    description: {
      type: String,
      required: [true, "Feedback must have a description"],
    },

    numOfComments: {
      type: Number,
      default: 0,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

productRequestSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "productRequestId",
});

const ProductRequest: Model<ProductRequestType> =
  models.ProductRequest ||
  mongoose.model<ProductRequestType>("ProductRequest", productRequestSchema);

export default ProductRequest;
