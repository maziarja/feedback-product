"use client";

import { upVote } from "@/app/_actions/productRequest/upVote";
import { MouseEvent } from "react";
import { MdKeyboardArrowUp } from "react-icons/md";

type UpVoteButtonProps = {
  upVotes: number;
  feedbackId: string;
};

function UpVoteButton({ upVotes, feedbackId }: UpVoteButtonProps) {
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
      className="bg-light-blue-gray flex cursor-pointer items-center gap-1 self-start rounded-xl px-2 py-1.5 text-sm @[688px]:flex-col @[688px]:gap-2.5"
    >
      <MdKeyboardArrowUp size={20} className="fill-blue" />
      <p className="text-dark-blue font-bold">{upVotes}</p>
    </button>
  );
}

export default UpVoteButton;
