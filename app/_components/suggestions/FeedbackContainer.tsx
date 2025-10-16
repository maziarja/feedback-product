import { ProductRequestType } from "@/lib/types";
import { FaComment } from "react-icons/fa";
import Link from "next/link";
import UpVoteButton from "./UpVoteButton";

type FeedbackContainerProps = {
  feedback: ProductRequestType;
};

async function FeedbackContainer({ feedback }: FeedbackContainerProps) {
  const { title, description, category, upVotes, numOfComments, _id } =
    feedback;
  return (
    <Link
      href={`/suggestions/${feedback._id}`}
      className="block cursor-pointer space-y-4 rounded-lg bg-white p-6 md:grid md:grid-cols-[1fr_10fr_1fr] md:gap-10"
    >
      <div className="hidden md:block">
        <UpVoteButton upVotes={upVotes} feedbackId={_id} />
      </div>
      <div className="flex flex-col gap-2 text-sm">
        <div className="space-y-1.5">
          <p className="text-xs font-medium text-gray-500">
            By{" "}
            <span className="text-dark-blue font-semibold">
              {feedback.userId.email}
            </span>
          </p>
          <p className="text-dark-blue font-bold">{title}</p>
        </div>
        <p className="text-blue-gray md:mb-3">{description}</p>
        <p className="bg-light-blue-gray text-blue self-start rounded-xl px-4 py-1.5 font-semibold">
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </p>
      </div>

      <div className="hidden cursor-pointer items-center gap-2 md:flex">
        <FaComment color="#CDD2EE" size={24} />
        <p
          className={`text-dark-blue text-sm font-bold ${numOfComments === 0 ? "text-gray-400" : ""}`}
        >
          {numOfComments}
        </p>
      </div>

      <div className="flex items-center justify-between md:hidden">
        <UpVoteButton upVotes={upVotes} feedbackId={_id} />
        <div className="flex cursor-pointer items-center gap-2">
          <FaComment color="#CDD2EE" size={24} />
          <p
            className={`text-dark-blue text-sm font-bold ${numOfComments === 0 ? "text-gray-400" : ""}`}
          >
            {numOfComments}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default FeedbackContainer;
