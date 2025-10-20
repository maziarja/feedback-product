"use server";

import { SortBy } from "@/app/_components/suggestions/SortbyDropDown";
import { convertToObject } from "@/lib/convertToObject";
import connectDB from "@/lib/database";
import { ProductRequestType, productRequestsSchema } from "@/lib/types";
import ProductRequest from "@/models/ProductRequests";
import "@/models/Comments";
import "@/models/Replies";

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
  })
    .populate("userId", "email")
    .lean();

  if (filter !== "all") {
    query.where("category").equals(filter);
  }
  const feedbacksDoc = await query.sort(sort).lean();
  const feedbacks = convertToObject(feedbacksDoc);
  const validFeedback = productRequestsSchema.safeParse(feedbacks);
  if (!validFeedback.success) {
    console.error(validFeedback.error);
    return;
  }
  if (validFeedback.success) return validFeedback.data;
}

export async function getInProgressProductRequests() {
  await connectDB();

  const inProgressFeedbacksDoc = await ProductRequest.find({
    status: "in-progress",
  })
    .populate("userId", "email")
    .sort({ upVotes: -1 })
    .lean();

  const inProgressFeedbacks = convertToObject(inProgressFeedbacksDoc);

  const validProgressFeedbacks =
    productRequestsSchema.safeParse(inProgressFeedbacks);

  if (!validProgressFeedbacks.success) {
    console.error(validProgressFeedbacks.error);
    return;
  }
  if (validProgressFeedbacks.success) return validProgressFeedbacks.data;
}

export async function getLiveProductRequests() {
  await connectDB();

  const liveFeedbacksDoc = await ProductRequest.find({
    status: "live",
  })
    .populate("userId", "email")
    .sort({ upVotes: -1 })
    .lean();

  const liveFeedbacks = convertToObject(liveFeedbacksDoc);

  const validLiveFeedbacks = productRequestsSchema.safeParse(liveFeedbacks);

  if (!validLiveFeedbacks.success) {
    console.error(validLiveFeedbacks.error);
    return;
  }
  if (validLiveFeedbacks.success) return validLiveFeedbacks.data;
}

export async function getPlannedProductRequests() {
  await connectDB();

  const plannedFeedbacksDoc = await ProductRequest.find({
    status: "planned",
  })
    .populate("userId", "email")
    .sort({ upVotes: -1 })
    .lean();

  const plannedFeedbacks = convertToObject(plannedFeedbacksDoc);

  const validPlannedFeedbacks =
    productRequestsSchema.safeParse(plannedFeedbacks);

  if (!validPlannedFeedbacks.success) {
    console.error(validPlannedFeedbacks.error);
    return;
  }
  if (validPlannedFeedbacks.success) return validPlannedFeedbacks.data;
}
