"use server";

import { auth } from "@/lib/auth";
import connectDB from "@/lib/database";
import {
  ProductRequestType,
  updateFeedbackSchema,
  UpdateFeedbackType,
} from "@/lib/types";
import ProductRequest from "@/models/ProductRequests";
import { revalidatePath } from "next/cache";

type Category = ProductRequestType["category"];
type Status = ProductRequestType["status"];

export async function updateProductRequest(
  data: UpdateFeedbackType,
  category: Category,
  status: Status,
  feedbackId: string,
) {
  try {
    const session = await auth();

    if (!session?.user?.id) throw new Error("Unauthorized");
    const currentUser = session.user.id;

    const userProductRequests = await ProductRequest.find({
      userId: currentUser,
    });

    if (
      userProductRequests.every(
        (feedback) => feedback._id.toString() !== feedbackId,
      )
    ) {
      return {
        success: false,
        message: "You are not allowed to update this feedback",
      };
    }

    const validProductRequestData = updateFeedbackSchema.safeParse(data);
    if (!validProductRequestData.success) {
      console.error(validProductRequestData.error);
      return;
    }

    await connectDB();
    const productRequest = await ProductRequest.findById(feedbackId);
    if (productRequest) {
      productRequest.title = validProductRequestData.data.title;
      productRequest.description = validProductRequestData.data.description;
      productRequest.category = category;
      productRequest.status = status;
    }

    await productRequest?.save();

    revalidatePath(`/feedbacks/${feedbackId}`);
    return { success: true };
  } catch (error) {
    console.error(error);
  }
}
