"use client";

import { useCurrentCommentId } from "@/app/contexts/CurrentCommentContext";
import { FaReply } from "react-icons/fa";

function ReplyButton({
  commentId,
  replyToId,
  replyToEmail,
}: {
  commentId: string;
  replyToId: string;
  replyToEmail: string;
}) {
  const { setCurrentCommentId, setReplyToId, setReplyToEmail } =
    useCurrentCommentId();

  function handleClick() {
    setCurrentCommentId(commentId);
    setReplyToId(replyToId);
    setReplyToEmail(replyToEmail);
  }

  return (
    <button
      onClick={handleClick}
      className="text-blue flex cursor-pointer items-center gap-2 text-sm font-semibold"
    >
      <FaReply className="inline-block" />
      <span>Reply</span>
    </button>
  );
}

export default ReplyButton;
