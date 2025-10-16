import { getFeedbackDetails } from "@/app/_actions/productRequest/getFeedbackDetails";
import UpdateFeedbackForm from "@/app/_components/suggestions/updateFeedbackForm";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { MdKeyboardArrowLeft } from "react-icons/md";

type Params = Promise<{ feedbackId: string }>;

async function page({ params }: { params: Params }) {
  const session = await auth();
  const { feedbackId } = await params;
  const feedback = await getFeedbackDetails(feedbackId);
  if (session?.user?.id !== feedback?.userId._id.toString())
    redirect(`/suggestions/${feedbackId}`);
  return (
    <div className="flex flex-col items-center space-y-6 px-6 pt-9.5 pb-22">
      <div className="w-full max-w-135">
        <Link
          href={`/feedbacks/${feedbackId}`}
          className="mb-13 flex items-center gap-2"
        >
          <MdKeyboardArrowLeft size={20} className="fill-blue" />
          <p className="text-blue-gray text-sm font-bold">Go Back</p>
        </Link>
        {feedback && <UpdateFeedbackForm feedback={feedback} />}
      </div>
    </div>
  );
}

export default page;
