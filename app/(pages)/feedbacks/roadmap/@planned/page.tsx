import { getPlannedProductRequests } from "@/app/_actions/productRequest/getProductRequests";
import PlannedContainer from "@/app/_components/roadmap/PlannedContainer";
import FeedbackContainer from "@/app/_components/feedbacks/FeedbackContainer";
import { getUser } from "@/app/_actions/user/getUser";
import { ProductRequestType } from "@/lib/types";

async function page() {
  const [plannedFeedbacks, currentUser] = await Promise.all([
    getPlannedProductRequests(),
    getUser(),
  ]);

  const isUpvoted = (upvotedBy: ProductRequestType["upvotedBy"]) => {
    return currentUser ? upvotedBy.includes(currentUser?._id) : false;
  };

  if (!plannedFeedbacks) return null;

  return (
    <PlannedContainer plannedFeedbacksNum={plannedFeedbacks?.length}>
      <div className="space-y-4">
        {plannedFeedbacks?.map((feedback) => (
          <FeedbackContainer
            key={feedback._id}
            isUpvoted={isUpvoted}
            feedback={feedback}
          />
        ))}
      </div>
    </PlannedContainer>
  );
}

export default page;
