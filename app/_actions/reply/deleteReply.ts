"use server";

import { auth } from "@/lib/auth";
import connectDB from "@/lib/database";
import ProductRequest from "@/models/ProductRequests";
import Reply from "@/models/Replies";
import { revalidatePath } from "next/cache";
import { ParamValue } from "next/dist/server/request/params";

export async function deleteReply(
  replyId: string,
  productRequestId: ParamValue,
) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");
  const reply = await Reply.findById(replyId);

  if (!reply) return;
  if (reply.userId.toString() !== session.user?.id)
    throw new Error("You are not allowed to delete this comment");

  try {
    await connectDB();
    // 1 Delete comment
    await reply.deleteOne();

    // 2 Decrease numOfComment
    const productRequest = await ProductRequest.findById(productRequestId);
    if (productRequest) {
      productRequest.numOfComments -= 1;
      await productRequest.save();

      revalidatePath(`/suggestions/${productRequestId}`);
      return { success: true };
    }
  } catch (error) {
    console.error(error);
  }
}
