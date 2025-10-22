import { ProductRequestsType } from "@/lib/types";
import { FaComment } from "react-icons/fa";
import Link from "next/link";
import UpVoteButton from "./UpVoteButton";

type FeedbackContainerProps = {
  feedback: ProductRequestsType[0];
};

async function FeedbackContainer({ feedback }: FeedbackContainerProps) {
  const { title, description, category, upVotes, _id, numOfComments } =
    feedback;

  return (
    <Link
      href={`/feedbacks/${feedback._id}`}
      className={`block cursor-pointer space-y-4 rounded-lg bg-white p-6 @[688px]:grid @[688px]:grid-cols-[1fr_10fr_1fr] @[688px]:gap-10 ${feedback.status === "in-progress" && "border-purple border-t-6"} ${feedback.status === "planned" && "border-orange border-t-6"} ${feedback.status === "live" && "border-light-blue border-t-6"}`}
    >
      <div className="hidden @[688px]:block">
        <UpVoteButton upVotes={upVotes} feedbackId={_id} />
      </div>
      <div className="flex flex-col gap-2 text-sm">
        {feedback.status === "in-progress" && (
          <div className="mb-3 flex items-center gap-2">
            <div className="bg-purple h-2 w-2 rounded-full" />
            <p className="text-blue-gray text-sm">In Progress</p>
          </div>
        )}
        {feedback.status === "planned" && (
          <div className="mb-3 flex items-center gap-2">
            <div className="bg-orange h-2 w-2 rounded-full" />
            <p className="text-blue-gray text-sm">Planned</p>
          </div>
        )}
        {feedback.status === "live" && (
          <div className="mb-3 flex items-center gap-2">
            <div className="bg-light-blue h-2 w-2 rounded-full" />
            <p className="text-blue-gray text-sm">Live</p>
          </div>
        )}
        <div className="space-y-1.5">
          <p className="text-xs font-medium text-gray-500">
            By{" "}
            <span className="text-dark-blue font-semibold">
              {feedback.userId.email?.split("@")[0]}
            </span>
          </p>
          <p className="text-dark-blue font-bold">{title}</p>
        </div>
        <p className="text-blue-gray whitespace-pre-wrap @[688px]:mb-3">
          {description}
        </p>
        <p className="bg-light-blue-gray text-blue self-start rounded-xl px-4 py-1.5 font-semibold">
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </p>
      </div>

      <div className="hidden cursor-pointer items-center gap-2 @[688px]:flex">
        <FaComment color="#CDD2EE" size={24} />
        <p
          className={`text-dark-blue text-sm font-bold ${numOfComments === 0 ? "text-gray-400" : ""}`}
        >
          {numOfComments}
        </p>
      </div>

      <div className="flex items-center justify-between @[688px]:hidden">
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
