import Link from "next/link";

function AddFeedbackLink() {
  return (
    <Link
      href={"/newFeedback"}
      className="bg-purple hover:bg-purple/80 cursor-pointer rounded-lg px-4 py-2.5 text-sm font-bold text-white"
    >
      + Add Feedback
    </Link>
  );
}

export default AddFeedbackLink;
