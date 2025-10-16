"use server";

import { convertToObject } from "@/lib/convertToObject";
import connectDB from "@/lib/database";
import { productRequestSchema } from "@/lib/types";
import ProductRequest from "@/models/ProductRequests";

export async function getFeedbackDetails(feedbackId: string) {
  await connectDB();

  const feedbackDoc = await ProductRequest.findById(feedbackId)
    .populate("userId")
    .lean();

  const feedback = convertToObject(feedbackDoc);

  const validProductRequest = productRequestSchema.safeParse(feedback);
  if (!validProductRequest.success) {
    console.error(validProductRequest.error);
    return;
  }

  return validProductRequest.data;
}
