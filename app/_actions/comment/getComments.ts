"use server";

import { convertToObject } from "@/lib/convertToObject";
import connectDB from "@/lib/database";
import { CommentsSchema } from "@/lib/types";
import Comment from "@/models/Comments";
import "@/models/Replies";

export async function getComments(feedbackId: string) {
  await connectDB();

  const commentsDoc = await Comment.find({
    productRequestId: feedbackId,
  })
    .populate("userId")
    .populate({
      path: "replies",
      populate: [{ path: "userId" }, { path: "replyTo" }],
    })
    .lean();

  const comment = convertToObject(commentsDoc);
  const validComment = CommentsSchema.safeParse(comment);
  if (!validComment.success) {
    console.error(validComment.error);
    return;
  }
  return validComment.data;
}
