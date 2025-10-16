"use server";

import { auth } from "@/lib/auth";
import connectDB from "@/lib/database";
import {
  createFeedbackSchema,
  CreateFeedbackType,
  ProductRequestType,
} from "@/lib/types";
import ProductRequest from "@/models/ProductRequests";
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
    const userId = session.user.id;

    const newProductRequest = new ProductRequest({
      description: validCreateFeedback.data.description,
      title: validCreateFeedback.data.title,
      category,
      userId,
    });

    await newProductRequest.save();
    revalidatePath("/suggestions");
    return { success: true };
  } catch (error) {
    console.error(error);
  }
}
