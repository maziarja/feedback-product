"use client";
import PrimaryButton from "../UI/PrimaryButton";
import { createReply } from "@/app/_actions/reply/createReply";
import { FormEvent, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useCurrentCommentId } from "@/app/contexts/CurrentCommentContext";

function AddReplyForm({
  commentId,
  feedbackId,
}: {
  commentId: string;
  feedbackId: string;
}) {
  const [content, setContent] = useState("");
  const [isPending, setIsPending] = useState(false);
  const { currentCommentId, replyToEmail, replyToId, setCurrentCommentId } =
    useCurrentCommentId();
  const isVisible = commentId === currentCommentId;

  async function handleAddReply(e: FormEvent) {
    e.preventDefault();
    setIsPending(true);
    await createReply(content, replyToId, currentCommentId, feedbackId);
    setIsPending(false);
    setContent("");
    setCurrentCommentId("");
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.form
          initial={{ opacity: 0, y: -20, height: 0 }}
          animate={{ opacity: 1, y: 0, height: "auto" }}
          exit={{ opacity: 0, y: -20, height: 0 }}
          transition={{ duration: 0.2 }}
          className={`grid rounded-lg bg-white opacity-0`}
        >
          <button
            className="mb-4 ml-auto cursor-pointer"
            type="button"
            onClick={() => {
              setCurrentCommentId("");
              setContent("");
            }}
          >
            <IoIosCloseCircleOutline
              className="fill-blue-gray hover:fill-dark-blue"
              size={24}
            />
          </button>
          <div className="flex flex-col gap-4 md:flex-row">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={
                `@${replyToEmail.split("@")[0]}` || "Type your comment here"
              }
              className="bg-very-light-blue-gray ring-dark-blue/20 text-very-dark-blue hover:ring-blue mb-4 field-sizing-content min-h-20 flex-1 resize-none rounded-sm p-4 text-sm ring-1 outline-none hover:cursor-pointer"
            />
            <div className="ml-auto">
              <PrimaryButton isPending={isPending} onClick={handleAddReply}>
                Post Reply
              </PrimaryButton>
            </div>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

export default AddReplyForm;
