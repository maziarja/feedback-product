"use server";

import connectDB from "@/lib/database";
import { UserType } from "@/lib/types";
import Comment from "@/models/Comments";
import ProductRequest from "@/models/ProductRequests";
import Reply from "@/models/Replies";
import User from "@/models/Users";

export async function deleteDbData(user: UserType) {
  await connectDB();
  // update numOfComments for deleting comments
  const userComments = await Comment.find({ userId: user._id });
  for (const comment of userComments) {
    const productRequest = await ProductRequest.findById(
      comment.productRequestId,
    );
    if (productRequest) {
      productRequest.numOfComments = Math.max(
        0,
        productRequest.numOfComments - 1,
      );
      await productRequest.save();
    }
  }
  // delete comments
  await Comment.deleteMany({ userId: user._id });
  // update numOfComments for deleting replies
  const userReplies = await Reply.find({ userId: user._id });

  for (const reply of userReplies) {
    const productRequest = await ProductRequest.findById(
      reply.productRequestId,
    );
    if (productRequest) {
      productRequest.numOfComments = Math.max(
        0,
        productRequest.numOfComments - 1,
      );
      await productRequest.save();
    }
  }
  // delete replies
  await Reply.deleteMany({ userId: user._id });

  // delete feedbacks
  await ProductRequest.deleteMany({ userId: user._id });
  //  delete user
  await User.deleteOne({ email: user.email });
}
