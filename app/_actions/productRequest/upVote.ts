"use server";

import { auth } from "@/lib/auth";
import connectDB from "@/lib/database";
import ProductRequest from "@/models/ProductRequests";
import { revalidatePath } from "next/cache";

export async function upVote(productRequestId: string) {
  try {
    await connectDB();
    const session = await auth();
    if (!session?.user?.id) throw new Error("Unauthorized");
    const currentUserId = session.user.id;

    const productRequest = await ProductRequest.findById(productRequestId);

    const isValid = !productRequest?.upvotedBy.includes(currentUserId);

    if (productRequest && isValid) {
      productRequest.upVotes += 1;
      productRequest.upvotedBy.push(currentUserId);
      await productRequest.save();
    }

    revalidatePath(`/suggestions/${productRequestId}`);
  } catch (error) {
    console.error(error);
  }
}
