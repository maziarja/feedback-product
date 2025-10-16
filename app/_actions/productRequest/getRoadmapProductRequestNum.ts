"use server";

import connectDB from "@/lib/database";
import ProductRequest from "@/models/ProductRequests";

export async function getRoadmapProductRequestNum() {
  await connectDB();

  const [numOfPlanned, numOfInProgress, numOfLive] = await Promise.all([
    ProductRequest.countDocuments({
      status: "planned",
    }),
    ProductRequest.countDocuments({
      status: "in-progress",
    }),
    ProductRequest.countDocuments({
      status: "live",
    }),
  ]);

  return { numOfInProgress, numOfLive, numOfPlanned };
}
