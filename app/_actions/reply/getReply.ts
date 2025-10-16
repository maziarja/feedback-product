"use server";

import { convertToObject } from "@/lib/convertToObject";
import connectDB from "@/lib/database";
import { repliesSchema } from "@/lib/types";
import Reply from "@/models/Replies";

export async function getReply(commentId: string) {
  await connectDB();

  const replyDoc = await Reply.find({
    commentId,
  }).lean();

  const replies = convertToObject(replyDoc);
  const validReply = repliesSchema.safeParse(replies);
  if (!validReply.success) {
    console.error(validReply.error);
    return;
  }
  return validReply.data;
}
