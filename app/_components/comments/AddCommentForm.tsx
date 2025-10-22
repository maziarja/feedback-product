"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import PrimaryButton from "../UI/PrimaryButton";
import { createComment } from "@/app/_actions/comment/createComment";

type AddCommentFormProps = {
  feedbackId: string;
};

function AddCommentForm({ feedbackId }: AddCommentFormProps) {
  const LIMIT_CHAR = 250;
  const [content, setContent] = useState("");
  const [limitChar, setLimitChar] = useState(LIMIT_CHAR);
  const [isPending, setIsPending] = useState(false);

  function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
    const text = e.target.value;
    setContent(text);
    setLimitChar(LIMIT_CHAR - text.length);
  }

  async function handleCreateComment(e: FormEvent) {
    e.preventDefault();
    setIsPending(true);
    await createComment(content, feedbackId);
    setIsPending(false);
    setContent("");
    setLimitChar(LIMIT_CHAR);
  }

  return (
    <form className="rounded-lg bg-white p-6">
      <p className="text-dark-blue mb-6 text-lg font-bold">Add Comment</p>
      <textarea
        value={content}
        id="comment"
        onChange={handleChange}
        placeholder="Type your comment here"
        className="bg-very-light-blue-gray text-very-dark-blue ring-dark-blue/20 hover:ring-blue mb-4 field-sizing-content min-h-20 w-full cursor-pointer resize-none rounded-sm p-4 text-sm ring-1 outline-none"
      />
      <div className="flex items-center justify-between">
        <p className="text-blue-gray text-sm">{limitChar} Characters left</p>
        <PrimaryButton isPending={isPending} onClick={handleCreateComment}>
          Post Comment
        </PrimaryButton>
      </div>
    </form>
  );
}

export default AddCommentForm;
