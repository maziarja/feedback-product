import illustration from "@/public/suggestions/illustration-empty.svg";
import Image from "next/image";
import AddFeedbackLink from "../UI/AddFeedbackLink";

function EmptySuggestion() {
  return (
    <div className="flex min-h-115 flex-col items-center justify-center rounded-xl bg-white px-6 text-center lg:min-h-150">
      <Image
        className="mb-10"
        src={illustration}
        width={0}
        priority
        height={0}
        alt="illustration"
      />
      <div className="mb-6 space-y-3.5">
        <p className="text-dark-blue text-lg font-bold md:text-2xl">
          There is no feedback yet.
        </p>
        <p className="text-blue-gray text-sm md:text-base">
          Got a suggestion? Found a bug that needs to be squashed? We love
          hearing about new ideas to improve our app.
        </p>
      </div>
      <AddFeedbackLink />
    </div>
  );
}

export default EmptySuggestion;
