"use client";

import { upVote } from "@/app/_actions/productRequest/upVote";
import { MouseEvent } from "react";
import { MdKeyboardArrowUp } from "react-icons/md";

type UpVoteButtonProps = {
  upVotes: number;
  feedbackId: string;
  doesCurrentUserUpvote: boolean;
};

function UpVoteButton({
  upVotes,
  feedbackId,
  doesCurrentUserUpvote,
}: UpVoteButtonProps) {
  async function handleClick(
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
  ) {
    e.preventDefault();
    e.stopPropagation();
    await upVote(feedbackId);
  }
  return (
    <button
      onClick={handleClick}
      className={`flex cursor-pointer items-center gap-1 self-start rounded-xl px-2 py-1.5 text-sm @[688px]:flex-col @[688px]:gap-2.5 ${doesCurrentUserUpvote ? "bg-blue" : "bg-light-blue-gray hover:bg-[#CFD7FF]"}`}
    >
      <MdKeyboardArrowUp
        size={20}
        className={`${doesCurrentUserUpvote ? "fill-white" : "fill-blue"}`}
      />
      <p
        className={`font-bold ${doesCurrentUserUpvote ? "text-white" : "text-dark-blue"}`}
      >
        {upVotes}
      </p>
    </button>
  );
}

export default UpVoteButton;
