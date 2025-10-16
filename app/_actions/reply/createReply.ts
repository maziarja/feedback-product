"use server";

import { auth } from "@/lib/auth";
import connectDB from "@/lib/database";
import ProductRequest from "@/models/ProductRequests";
import Reply from "@/models/Replies";
import { revalidatePath } from "next/cache";

export async function createReply(
  content: string,
  replyTo: string,
  commentId: string,
  productRequestId: string,
) {
  const session = await auth();
  if (!session) throw new Error("Unauthorize");
  if (content.trim() === "") return;
  try {
    await connectDB();
    // 1 Create comment
    const comment = new Reply({
      content,
      replyTo,
      userId: session.user?.id,
      productRequestId,
      commentId,
    });
    await comment.save();

    // 2 Update numOfComment
    const productRequest = await ProductRequest.findById(productRequestId);
    if (productRequest) {
      productRequest.numOfComments += 1;
      await productRequest.save();
    }

    revalidatePath(`/feedbacks/${productRequestId}`);
  } catch (error) {
    console.error(error);
  }
}
