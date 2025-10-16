"use server";

import { auth } from "@/lib/auth";
import connectDB from "@/lib/database";
import Comment from "@/models/Comments";
import ProductRequest from "@/models/ProductRequests";
import { revalidatePath } from "next/cache";

export async function createComment(content: string, productRequestId: string) {
  const session = await auth();
  console.log(session?.user);
  if (!session) throw new Error("Unauthorize");
  if (content.trim() === "") return;
  try {
    await connectDB();
    // 1 Create comment
    const comment = new Comment({
      content,
      userId: session.user?.id,
      productRequestId,
    });
    await comment.save();

    // 2 Update numOfComment
    const productRequest = await ProductRequest.findById(productRequestId);
    if (productRequest) {
      productRequest.numOfComments += 1;
      await productRequest.save();
    }

    // await ProductRequest.findByIdAndUpdate(productRequestId, {
    //   $inc: { numOfComments: 1 },
    // });
    revalidatePath(`/suggestions/${productRequestId}`);
  } catch (error) {
    console.error(error);
  }
}
