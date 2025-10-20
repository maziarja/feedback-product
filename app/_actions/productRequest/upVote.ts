"use server";

import { auth } from "@/lib/auth";
import connectDB from "@/lib/database";
import ProductRequest from "@/models/ProductRequests";
import User from "@/models/Users";
import { revalidatePath } from "next/cache";

export async function upVote(productRequestId: string) {
  try {
    await connectDB();
    const session = await auth();
    if (!session?.user?.id) throw new Error("Unauthorized");
    const currentUser = await User.findOne({ email: session?.user?.email });
    if (!currentUser?._id) return;
    const productRequest = await ProductRequest.findById(productRequestId);

    const isValid = !productRequest?.upvotedBy.includes(
      currentUser?._id.toString(),
    );

    if (productRequest && isValid) {
      productRequest.upVotes += 1;
      productRequest.upvotedBy.push(currentUser?._id.toString());
      await productRequest.save();
    }

    revalidatePath(`/feedbacks/${productRequestId}`);
  } catch (error) {
    console.error(error);
  }
}
