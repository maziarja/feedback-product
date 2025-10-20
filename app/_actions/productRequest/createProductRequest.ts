"use server";

import { auth } from "@/lib/auth";
import connectDB from "@/lib/database";
import {
  createFeedbackSchema,
  CreateFeedbackType,
  ProductRequestType,
} from "@/lib/types";
import ProductRequest from "@/models/ProductRequests";
import User from "@/models/Users";
import { revalidatePath } from "next/cache";

type Category = ProductRequestType["category"];

export async function createProductRequest(
  data: CreateFeedbackType,
  category: Category,
) {
  try {
    const validCreateFeedback = createFeedbackSchema.safeParse(data);

    if (!validCreateFeedback.success) {
      console.error(validCreateFeedback.error);
      return;
    }

    await connectDB();
    const session = await auth();
    if (!session?.user?.id) throw new Error("Unauthorized");
    const currentUser = await User.findOne({ email: session?.user?.email });

    const newProductRequest = new ProductRequest({
      description: validCreateFeedback.data.description,
      title: validCreateFeedback.data.title,
      category,
      userId: currentUser?._id,
    });

    await newProductRequest.save();
    revalidatePath("/feedbacks/suggestions");
    return { success: true };
  } catch (error) {
    console.error(error);
  }
}
