import { getLiveProductRequests } from "@/app/_actions/productRequest/getProductRequests";
import LiveContainer from "@/app/_components/roadmap/LiveContainer";
import FeedbackContainer from "@/app/_components/feedbacks/FeedbackContainer";
import { getUser } from "@/app/_actions/user/getUser";
import { ProductRequestType } from "@/lib/types";

async function Page() {
  const [liveFeedbacks, currentUser] = await Promise.all([
    getLiveProductRequests(),
    getUser(),
  ]);

  const isUpvoted = (upvotedBy: ProductRequestType["upvotedBy"]) => {
    return currentUser ? upvotedBy.includes(currentUser?._id) : false;
  };

  if (!liveFeedbacks) return null;

  return (
    <LiveContainer liveFeedbacksNum={liveFeedbacks?.length}>
      <div className="space-y-4">
        {liveFeedbacks?.map((feedback) => (
          <div key={feedback._id} className="min-h-68 rounded-lg bg-white">
            <FeedbackContainer isUpvoted={isUpvoted} feedback={feedback} />
          </div>
        ))}
      </div>
    </LiveContainer>
  );
}

export default Page;
