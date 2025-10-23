import FeedbackContainer from "@/app/_components/feedbacks/FeedbackContainer";
import EditFeedbackButton from "@/app/_components/feedbacks/EditFeedbackButton";
import { getFeedbackDetails } from "@/app/_actions/productRequest/getFeedbackDetails";
import CommentsList from "@/app/_components/comments/CommentsList";
import AddCommentForm from "@/app/_components/comments/AddCommentForm";
import { auth } from "@/lib/auth";
import GoBackFeedbackDetailsButton from "@/app/_components/feedbacks/GoBackFeedbackDetailsButton";
import { getUser } from "@/app/_actions/user/getUser";
import { ProductRequestType } from "@/lib/types";

type Params = Promise<{ feedbackId: string }>;

async function page({ params }: { params: Params }) {
  const session = await auth();
  const { feedbackId } = await params;

  const [feedback, currentUser] = await Promise.all([
    getFeedbackDetails(feedbackId),
    getUser(),
  ]);

  const isCurrentUser = session?.user?.email === feedback?.userId.email;

  const isUpvoted = (upvotedBy: ProductRequestType["upvotedBy"]) => {
    return currentUser ? upvotedBy.includes(currentUser?._id) : false;
  };

  if (!feedback) return null;
  return (
    <div className="mx-auto space-y-6 p-6 pb-22 md:w-full md:max-w-172.5 lg:max-w-182.5">
      <div className="flex items-center justify-between">
        <GoBackFeedbackDetailsButton feedbackStatus={feedback.status} />
        {isCurrentUser && <EditFeedbackButton feedbackId={feedback._id} />}
      </div>
      <FeedbackContainer feedback={feedback} isUpvoted={isUpvoted} />

      <CommentsList
        comments={feedback.comments}
        numOfComments={feedback.numOfComments}
      />

      <AddCommentForm feedbackId={feedbackId} />
    </div>
  );
}

export default page;
