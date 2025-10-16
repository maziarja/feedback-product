"use client";

import Link from "next/link";

type EditFeedbackButtonProps = {
  feedbackId: string;
};

function EditFeedbackButton({ feedbackId }: EditFeedbackButtonProps) {
  return (
    <Link
      href={`/suggestions/${feedbackId}/update`}
      className="bg-blue text-small text-very-light-blue-gray rounded-xl px-4 py-2.5 font-bold"
    >
      Edit Feedback
    </Link>
  );
}

export default EditFeedbackButton;
