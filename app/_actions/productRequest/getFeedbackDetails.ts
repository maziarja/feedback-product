"use server";

import { convertToObject } from "@/lib/convertToObject";
import connectDB from "@/lib/database";
import ProductRequest from "@/models/ProductRequests";
import "@/models/Comments";
import "@/models/Replies";
import { feedBackDetailsSchema } from "@/lib/types";
import { redirect } from "next/navigation";

export async function getFeedbackDetails(feedbackId: string) {
  try {
    await connectDB();
    const feedbackDoc = await ProductRequest.findById(feedbackId)
      .populate("userId")
      .populate("comments")
      .populate([
        {
          path: "comments",
          populate: { path: "userId" },
        },
        {
          path: "comments",
          populate: {
            path: "replies",
            populate: [{ path: "userId" }, { path: "replyTo" }],
          },
        },
      ])
      .lean();
    const feedback = convertToObject(feedbackDoc);
    const validProductRequest = feedBackDetailsSchema.safeParse(feedback);
    if (!validProductRequest.success) {
      console.error(validProductRequest.error);
      return;
    }
    return validProductRequest.data;
  } catch (error) {
    console.error(error);
    redirect("/");
  }
}
