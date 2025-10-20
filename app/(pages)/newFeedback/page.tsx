import AddFeedbackForm from "@/app/_components/feedbacks/AddFeedbackForm";
import Link from "next/link";
import { MdKeyboardArrowLeft } from "react-icons/md";

function page() {
  return (
    <div className="flex flex-col items-center space-y-6 px-6 pt-9.5 pb-22">
      <div className="w-full max-w-135">
        <Link
          href={"/feedbacks/suggestions"}
          className="mb-13 flex items-center gap-2"
        >
          <MdKeyboardArrowLeft size={20} className="fill-blue" />
          <p className="text-blue-gray text-sm font-bold">Go Back</p>
        </Link>
        <AddFeedbackForm />
      </div>
    </div>
  );
}

export default page;
