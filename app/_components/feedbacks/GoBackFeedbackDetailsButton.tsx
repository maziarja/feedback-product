"use client";

import { useSwitchRoadmap } from "@/app/contexts/SwitchRoadmapContext";
import { ProductRequestType } from "@/lib/types";
import { usePathname, useRouter } from "next/navigation";
import { MdKeyboardArrowLeft } from "react-icons/md";

type GoBackFeedbackDetailsButtonProps = {
  feedbackStatus: ProductRequestType["status"];
};

function GoBackFeedbackDetailsButton({
  feedbackStatus,
}: GoBackFeedbackDetailsButtonProps) {
  const router = useRouter();
  const { setSwitchRoadmap } = useSwitchRoadmap();
  const pathname = usePathname();
  const isEditingPage = !pathname.endsWith("update");

  function handleClickGoBack() {
    if (feedbackStatus !== "suggestion") setSwitchRoadmap(feedbackStatus);
    if (isEditingPage && feedbackStatus === "suggestion")
      router.push("/feedbacks/suggestions");
    if (isEditingPage && feedbackStatus !== "suggestion")
      router.push("/feedbacks/roadmap");
    if (!isEditingPage) router.back();
  }

  return (
    <button
      onClick={handleClickGoBack}
      className="flex cursor-pointer items-center gap-2"
    >
      <MdKeyboardArrowLeft size={20} className="fill-blue" />
      <p className="text-blue-gray text-sm font-bold">Go Back</p>
    </button>
  );
}

export default GoBackFeedbackDetailsButton;
