"use server";

import { SortBy } from "@/app/_components/suggestions/SortbyDropDown";
import { convertToObject } from "@/lib/convertToObject";
import connectDB from "@/lib/database";
import { ProductRequestType, productsRequestSchema } from "@/lib/types";
import ProductRequest from "@/models/ProductRequests";

type FilterBy = ProductRequestType["category"] | "all";

export async function getSuggestionsProductRequests(
  filterBy: FilterBy,
  sortBy: SortBy,
) {
  await connectDB();
  const filter = filterBy || "all";

  const sort: Record<string, 1 | -1> = {
    ...(sortBy === undefined && { upVotes: -1 }),
    ...(sortBy === "Most-UpVotes" && { upVotes: -1 }),
    ...(sortBy === "Least-UpVotes" && { upVotes: 1 }),
    ...(sortBy === "Least-Comments" && { numOfComments: 1 }),
    ...(sortBy === "Most-Comments" && { numOfComments: -1 }),
  };

  const query = ProductRequest.find({
    status: "suggestion",
  }).populate("userId");

  if (filter !== "all") {
    query.where("category").equals(filter);
  }

  const feedbacksDoc = await query.sort(sort).lean();
  const feedback = convertToObject(feedbacksDoc);

  const validFeedback = productsRequestSchema.safeParse(feedback);
  if (!validFeedback.success) {
    console.error(validFeedback.error);
    return;
  }
  if (validFeedback.success) return validFeedback.data;
}
