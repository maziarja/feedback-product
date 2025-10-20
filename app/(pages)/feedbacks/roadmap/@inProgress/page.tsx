import { getInProgressProductRequests } from "@/app/_actions/productRequest/getProductRequests";
import InProgressContainer from "@/app/_components/roadmap/InProgressContainer";
import FeedbackContainer from "@/app/_components/feedbacks/FeedbackContainer";

async function page() {
  const inProgressFeedbacks = await getInProgressProductRequests();
  if (!inProgressFeedbacks) return null;

  return (
    <InProgressContainer inProgressFeedbackNum={inProgressFeedbacks?.length}>
      <div className="space-y-4">
        {inProgressFeedbacks?.map((feedback) => (
          <FeedbackContainer key={feedback._id} feedback={feedback} />
        ))}
      </div>
    </InProgressContainer>
  );
}

export default page;
