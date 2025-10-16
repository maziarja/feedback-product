import { ReplyType } from "@/lib/types";
import Image from "next/image";
import ReplyButton from "../comments/ReplyButton";
import defaultAvatar from "@/public/assets/user-images/defaultAvatar.png";
import { auth } from "@/lib/auth";
import DeleteButton from "../comments/DeleteButton";

type ReplyContainerProps = {
  reply: ReplyType;
  commentId: string;
};

async function ReplyContainer({ reply, commentId }: ReplyContainerProps) {
  const session = await auth();
  const isCurrentUser = session?.user?.id === reply.userId._id;
  const imageSrc = reply.userId?.image
    ? `${reply.userId?.image}`
    : defaultAvatar;
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Image
          src={imageSrc}
          width={40}
          height={40}
          priority
          alt="profile picture "
          className="rounded-full"
        />
        <div className="space-y-1">
          <p className="text-dark-blue text-sm font-bold">
            {reply.userId?.name}
          </p>
          <p className="text-blue-gray text-sm">
            @{reply.userId?.email.split("@")[0]}
          </p>
        </div>
        <div className="ml-auto">
          {isCurrentUser ? (
            <DeleteButton replyId={reply._id} />
          ) : (
            <ReplyButton
              commentId={commentId}
              replyToId={reply.userId._id}
              replyToEmail={reply.userId.email}
            />
          )}
        </div>
      </div>
      <div className="text-blue-gray space-x-2 text-sm">
        <span className="text-purple text-sm font-bold">
          @{reply.replyTo?.email.split("@")[0]}
        </span>
        <span>{reply.content}</span>
      </div>
    </div>
  );
}

export default ReplyContainer;
