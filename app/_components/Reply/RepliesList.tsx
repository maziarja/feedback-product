import ReplyContainer from "./ReplyContainer";
import { ReplyType } from "@/lib/types";

type RepliesListProps = {
  reply: ReplyType;
  commentId: string;
};

async function RepliesList({ reply, commentId }: RepliesListProps) {
  return (
    <div className="space-y-6 bg-white">
      <ReplyContainer key={reply._id} reply={reply} commentId={commentId} />
    </div>
  );
}

export default RepliesList;
