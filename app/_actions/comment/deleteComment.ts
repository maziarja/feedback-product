"use server";

import { auth } from "@/lib/auth";
import connectDB from "@/lib/database";
import Comment from "@/models/Comments";
import ProductRequest from "@/models/ProductRequests";
import User from "@/models/Users";
import { revalidatePath } from "next/cache";
import { ParamValue } from "next/dist/server/request/params";

export async function deleteComment(
  commentId: string,
  productRequestId: ParamValue,
) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");
  const comment = await Comment.findById(commentId);

  if (!comment) return;
  const currentUser = await User.findOne({ email: session?.user?.email });
  if (comment.userId.toString() !== currentUser?._id.toString())
    throw new Error("You are not allowed to delete this comment");

  try {
    await connectDB();

    // 1 Delete comment
    await comment.deleteOne();

    // 2 Decrease numOfComment
    const productRequest = await ProductRequest.findById(productRequestId);
    if (productRequest) {
      productRequest.numOfComments -= 1;
      await productRequest.save();
    }

    revalidatePath(`/feedbacks/${productRequestId}`);
    return { success: true };
  } catch (error) {
    console.error(error);
  }
}
