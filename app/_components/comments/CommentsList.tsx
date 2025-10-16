import { getComments } from "@/app/_actions/comment/getComments";
import CommentContainer from "./CommentContainer";
import React from "react";

type CommentsListProps = {
  feedbackId: string;
  numOfComments: number;
};

async function CommentsList({ feedbackId, numOfComments }: CommentsListProps) {
  const comments = await getComments(feedbackId);
  if (!comments?.length) return null;
  return (
    <div className="space-y-6 rounded-lg bg-white p-6">
      <p className="text-dark-blue text-lg font-bold">
        {numOfComments} Comments
      </p>
      {comments?.map((comment, i) => (
        <React.Fragment key={comment._id}>
          <CommentContainer comment={comment} feedbackId={feedbackId} />
          {i + 1 < comments.length && (
            <div className="bg-dark-blue/15 h-[1px] w-full"></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

export default CommentsList;
