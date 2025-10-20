import Link from "next/link";
import { MdKeyboardArrowLeft } from "react-icons/md";
import AddFeedbackLink from "../UI/AddFeedbackLink";

function Header() {
  return (
    <div className="bg-very-dark-blue text-light-blue-gray flex items-center justify-between py-4.5 pr-6 pl-6 md:rounded-lg md:pr-3">
      <div className="flex flex-col items-center gap-1">
        <Link
          href={"/feedbacks/suggestions"}
          className="flex items-center gap-2"
        >
          <MdKeyboardArrowLeft size={20} className="fill-white" />
          <p className="text-sm font-bold text-white">Go Back</p>
        </Link>
        <p className="text-lg font-bold text-white">Roadmap</p>
      </div>
      <AddFeedbackLink />
    </div>
  );
}

export default Header;
