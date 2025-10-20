import { getLiveProductRequests } from "@/app/_actions/productRequest/getProductRequests";
import LiveContainer from "@/app/_components/roadmap/LiveContainer";
import FeedbackContainer from "@/app/_components/feedbacks/FeedbackContainer";

async function page() {
  const liveFeedbacks = await getLiveProductRequests();
  if (!liveFeedbacks) return null;

  return (
    <LiveContainer liveFeedbacksNum={liveFeedbacks?.length}>
      <div className="space-y-4">
        {liveFeedbacks?.map((feedback) => (
          <div key={feedback._id} className="min-h-68 rounded-lg bg-white">
            <FeedbackContainer feedback={feedback} />
          </div>
        ))}
      </div>
    </LiveContainer>
  );
}

export default page;
