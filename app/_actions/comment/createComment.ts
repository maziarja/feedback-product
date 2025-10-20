"use server";

import { auth } from "@/lib/auth";
import connectDB from "@/lib/database";
import Comment from "@/models/Comments";
import ProductRequest from "@/models/ProductRequests";
import User from "@/models/Users";
import { revalidatePath } from "next/cache";

export async function createComment(content: string, productRequestId: string) {
  const session = await auth();
  const currentUser = await User.findOne({ email: session?.user?.email });
  if (!session) throw new Error("Unauthorize");
  if (content.trim() === "") return;
  try {
    await connectDB();
    // 1 Create comment
    const comment = new Comment({
      content,
      userId: currentUser?._id,
      productRequestId,
    });

    // 2 Update numOfComment
    const productRequest = await ProductRequest.findById(productRequestId);
    if (productRequest) {
      productRequest.numOfComments += 1;
      await productRequest.save();
    }
    await comment.save();

    revalidatePath(`/feedbacks/${productRequestId}`);
  } catch (error) {
    console.error(error);
  }
}
