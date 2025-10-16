import { getRoadmapProductRequestNum } from "@/app/_actions/productRequest/getRoadmapProductRequestNum";
import Link from "next/link";

async function Roadmap() {
  const { numOfInProgress, numOfLive, numOfPlanned } =
    await getRoadmapProductRequestNum();

  return (
    <div className="space-y-6 rounded-lg bg-white px-6 pt-4.5 pb-6 md:flex-1">
      <div className="flex items-center justify-between">
        <p className="text-dark-blue text-lg font-bold">Roadmap</p>
        <Link
          href={"/roadmap"}
          className="text-blue text-sm font-semibold underline"
        >
          View
        </Link>
      </div>
      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-[1fr_3fr_auto] items-center">
          <div className="bg-orange h-2 w-2 rounded-full"></div>
          <p className="text-blue-gray text-base">Planned</p>
          <p className="text-blue-gray text-base font-bold">{numOfPlanned}</p>
        </div>
        <div className="grid grid-cols-[1fr_3fr_auto] items-center">
          <div className="bg-purple h-2 w-2 rounded-full"></div>
          <p className="text-blue-gray text-base">In-Progress</p>
          <p className="text-blue-gray text-base font-bold">
            {numOfInProgress}
          </p>
        </div>
        <div className="grid grid-cols-[1fr_3fr_auto] items-center">
          <div className="bg-light-blue h-2 w-2 rounded-full"></div>
          <p className="text-blue-gray text-base">Live</p>
          <p className="text-blue-gray text-base font-bold">{numOfLive}</p>
        </div>
      </div>
    </div>
  );
}

export default Roadmap;
