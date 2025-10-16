import { MdKeyboardArrowLeft } from "react-icons/md";
import FeedbackContainer from "@/app/_components/suggestions/FeedbackContainer";
import Link from "next/link";
import EditFeedbackButton from "@/app/_components/suggestions/EditFeedbackButton";
import { getFeedbackDetails } from "@/app/_actions/productRequest/getFeedbackDetails";
import CommentsList from "@/app/_components/comments/CommentsList";
import AddCommentForm from "@/app/_components/comments/AddCommentForm";
import { auth } from "@/lib/auth";

type Params = Promise<{ feedbackId: string }>;

async function page({ params }: { params: Params }) {
  const session = await auth();
  const { feedbackId } = await params;
  const feedback = await getFeedbackDetails(feedbackId);
  if (!feedback) return null;

  return (
    <div className="mx-auto space-y-6 p-6 pb-22 md:w-full md:max-w-172.5 lg:max-w-182.5">
      <div className="flex items-center justify-between">
        <Link href={"/suggestions"} className="flex items-center gap-2">
          <MdKeyboardArrowLeft size={20} className="fill-blue" />
          <p className="text-blue-gray text-sm font-bold">Go Back</p>
        </Link>
        {session?.user?.id === feedback.userId._id && (
          <EditFeedbackButton feedbackId={feedback._id} />
        )}
      </div>
      <FeedbackContainer feedback={feedback} />
      <CommentsList
        feedbackId={feedbackId}
        numOfComments={feedback.numOfComments}
      />
      <AddCommentForm feedbackId={feedbackId} />
      <p>just for test</p>
    </div>
  );
}

export default page;
