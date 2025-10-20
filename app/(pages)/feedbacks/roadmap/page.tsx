import { getRoadmapProductRequestNum } from "@/app/_actions/productRequest/getRoadmapProductRequestNum";
import Header from "@/app/_components/roadmap/Header";
import SwitchRoadmap from "@/app/_components/roadmap/SwitchRoadmap";

async function page() {
  const { numOfInProgress, numOfLive, numOfPlanned } =
    await getRoadmapProductRequestNum();
  const numOfFeedbacks = {
    inProgress: numOfInProgress,
    live: numOfLive,
    planned: numOfPlanned,
  };
  return (
    <div className="mb-4">
      <Header />
      <SwitchRoadmap numOfFeedbacks={numOfFeedbacks} />
    </div>
  );
}

export default page;
