"use server";

import { auth } from "@/lib/auth";
import connectDB from "@/lib/database";
import Comment from "@/models/Comments";
import ProductRequest from "@/models/ProductRequests";
import Reply from "@/models/Replies";
import User from "@/models/Users";
import { ParamValue } from "next/dist/server/request/params";

export async function deleteProductRequest(feedbackId: ParamValue) {
  try {
    await connectDB();
    const session = await auth();
    if (!session?.user?.id) throw new Error("Unauthorized");
    const currentUser = await User.findOne({ email: session?.user?.email });

    const userProductRequests = await ProductRequest.find({
      userId: currentUser?._id,
    });

    if (
      userProductRequests.every(
        (feedback) => feedback._id.toString() !== feedbackId,
      )
    ) {
      return {
        success: false,
        message: "You are not allowed to delete this feedback",
      };
    }

    await Reply.deleteMany({
      productRequestId: feedbackId,
    });
    await Comment.deleteMany({
      productRequestId: feedbackId,
    });
    await ProductRequest.findByIdAndDelete(feedbackId);

    return { success: true };
  } catch (error) {
    console.error(error);
  }
}
