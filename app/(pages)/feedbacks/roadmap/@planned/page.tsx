import { getPlannedProductRequests } from "@/app/_actions/productRequest/getProductRequests";
import PlannedContainer from "@/app/_components/roadmap/PlannedContainer";
import FeedbackContainer from "@/app/_components/feedbacks/FeedbackContainer";

async function page() {
  const plannedFeedbacks = await getPlannedProductRequests();
  if (!plannedFeedbacks) return null;

  return (
    <PlannedContainer plannedFeedbacksNum={plannedFeedbacks?.length}>
      <div className="space-y-4">
        {plannedFeedbacks?.map((feedback) => (
          <FeedbackContainer key={feedback._id} feedback={feedback} />
        ))}
      </div>
    </PlannedContainer>
  );
}

export default page;
