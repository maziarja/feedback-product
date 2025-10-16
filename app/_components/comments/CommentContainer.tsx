import { CommentType } from "@/lib/types";
import Image from "next/image";
import ReplyButton from "./ReplyButton";
import ReplyContainer from "../Reply/RepliesList";
import defaultAvatar from "@/public/assets/user-images/defaultAvatar.png";
import { auth } from "@/lib/auth";
import DeleteButton from "./DeleteButton";
import AddReplyForm from "../Reply/AddReplyForm";

type CommentContainerProps = {
  comment: CommentType;
  feedbackId: string;
};

async function CommentContainer({
  comment,
  feedbackId,
}: CommentContainerProps) {
  const session = await auth();
  const { userId } = comment;
  const isCurrentUser = session?.user?.id === comment.userId._id;
  const imageSrc = userId?.image ? `${userId?.image}` : defaultAvatar;
  if (!comment) return null;
  return (
    <div className="space-y-6">
      <div className="space-y-4 bg-white">
        <div className="flex items-center gap-4">
          <Image
            src={imageSrc}
            width={40}
            height={40}
            alt="profile picture "
            className="rounded-full"
          />
          <div className="space-y-1">
            <p className="text-dark-blue text-sm font-bold">{userId?.name}</p>
            <p className="text-blue-gray text-sm">
              @{userId?.email.split("@")[0]}
            </p>
          </div>
          <div className="relative ml-auto">
            {isCurrentUser ? (
              <DeleteButton commentId={comment._id} />
            ) : (
              <ReplyButton
                commentId={comment._id}
                replyToId={comment.userId._id}
                replyToEmail={comment.userId.email}
              />
            )}
          </div>
        </div>
        <p className="text-blue-gray text-sm">{comment.content}</p>
      </div>
      <div className="border-dark-blue/10 space-y-6 border-l-1 pl-6">
        {comment.replies &&
          comment.replies.map((reply) => (
            <ReplyContainer
              key={reply._id}
              reply={reply}
              commentId={comment._id}
            />
          ))}
        <AddReplyForm commentId={comment._id} feedbackId={feedbackId} />
      </div>
    </div>
  );
}

export default CommentContainer;
