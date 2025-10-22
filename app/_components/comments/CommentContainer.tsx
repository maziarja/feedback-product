import { CommentType } from "@/lib/types";
import Image from "next/image";
import ReplyButton from "./ReplyButton";
import defaultAvatar from "@/public/assets/user-images/defaultAvatar.png";
import { auth } from "@/lib/auth";
import DeleteButton from "./DeleteButton";
import AddReplyForm from "../Reply/AddReplyForm";
import ReplyContainer from "../Reply/ReplyContainer";

type CommentContainerProps = {
  comment: CommentType;
};

async function CommentContainer({ comment }: CommentContainerProps) {
  const session = await auth();

  const isCurrentUser = session?.user?.email === comment.userId.email;
  const imageSrc = comment.userId.image
    ? `${comment.userId?.image}`
    : defaultAvatar;
  if (!comment) return null;
  return (
    <div className="space-y-6">
      <div className="space-y-4 bg-white">
        <div className="flex items-center gap-4">
          <div className="relative h-10 w-10 overflow-hidden rounded-full">
            <Image
              src={imageSrc}
              fill
              alt="profile picture "
              className="rounded-full object-cover"
              sizes="40px"
            />
          </div>
          <div className="space-y-1">
            <p className="text-dark-blue text-sm font-bold">
              {comment.userId?.name}
            </p>
            <p className="text-blue-gray text-sm">
              @{comment.userId?.email.split("@")[0]}
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
        <p className="text-blue-gray text-sm whitespace-pre-wrap">
          {comment.content}
        </p>
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
        <AddReplyForm
          commentId={comment._id}
          feedbackId={comment.productRequestId}
        />
      </div>
    </div>
  );
}

export default CommentContainer;
