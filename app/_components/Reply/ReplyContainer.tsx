import Image from "next/image";
import DeleteButton from "../comments/DeleteButton";
import ReplyButton from "../comments/ReplyButton";
import { ReplyType } from "@/lib/types";
import { auth } from "@/lib/auth";
import defaultAvatar from "@/public/assets/user-images/defaultAvatar.png";

type ReplyContainerProps = {
  reply: ReplyType;
  commentId: string;
};

async function ReplyContainer({ reply, commentId }: ReplyContainerProps) {
  const session = await auth();

  const isCurrentUser = session?.user?.email === reply.userId.email;
  const imageSrc = reply.userId?.image
    ? `${reply.userId?.image}`
    : defaultAvatar;
  return (
    <div className="space-y-6 bg-white">
      <div className="space-y-4">
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
              {reply.userId?.name}
            </p>
            <p className="text-blue-gray text-sm">
              @{reply.userId?.email?.split("@")[0]}
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
            @{reply.replyTo?.email?.split("@")[0] || "Unknown"}
          </span>
          <p className="text-sm whitespace-pre-wrap md:text-[15px]">
            {reply.content}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ReplyContainer;
