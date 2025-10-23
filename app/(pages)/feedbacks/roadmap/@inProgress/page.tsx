import { getInProgressProductRequests } from "@/app/_actions/productRequest/getProductRequests";
import InProgressContainer from "@/app/_components/roadmap/InProgressContainer";
import FeedbackContainer from "@/app/_components/feedbacks/FeedbackContainer";
import { getUser } from "@/app/_actions/user/getUser";
import { ProductRequestType } from "@/lib/types";

async function page() {
  const [inProgressFeedbacks, currentUser] = await Promise.all([
    getInProgressProductRequests(),
    getUser(),
  ]);

  const isUpvoted = (upvotedBy: ProductRequestType["upvotedBy"]) => {
    return currentUser ? upvotedBy.includes(currentUser?._id) : false;
  };

  if (!inProgressFeedbacks) return null;

  return (
    <InProgressContainer inProgressFeedbackNum={inProgressFeedbacks?.length}>
      <div className="space-y-4">
        {inProgressFeedbacks?.map((feedback) => (
          <FeedbackContainer
            isUpvoted={isUpvoted}
            key={feedback._id}
            feedback={feedback}
          />
        ))}
      </div>
    </InProgressContainer>
  );
}

export default page;
