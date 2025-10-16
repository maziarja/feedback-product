"use client";

import { deleteComment } from "@/app/_actions/comment/deleteComment";
import { deleteProductRequest } from "@/app/_actions/productRequest/deleteProductRequest";
import { deleteReply } from "@/app/_actions/reply/deleteReply";
import { useParams, useRouter } from "next/navigation";
import { MdClose } from "react-icons/md";

function DeleteModal({
  commentId,
  replyId,
  closeModal,
}: {
  closeModal: () => void;
  commentId?: string;
  replyId?: string;
}) {
  const params = useParams();
  const router = useRouter();
  const { feedbackId } = params;
  async function handleDeleteComment() {
    if (commentId) {
      const result = await deleteComment(commentId, feedbackId);
      if (result?.success) closeModal();
    }
    if (replyId) {
      const result = await deleteReply(replyId, feedbackId);
      if (result?.success) closeModal();
    }
    if (feedbackId && !commentId && !replyId) {
      const result = await deleteProductRequest(feedbackId);
      if (result?.success) router.push("/suggestions");
    }
  }

  return (
    <div className="fixed inset-0 z-1 overflow-hidden bg-black/55">
      <div className="fixed top-1/2 left-1/2 z-9 flex w-full max-w-xs -translate-x-1/2 -translate-y-1/2 flex-col rounded-lg bg-white px-4 py-6 md:max-w-md">
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 cursor-pointer"
        >
          <MdClose size={20} className="fill-dark-blue" />
        </button>
        <p className="text-dark-blue mb-4 text-lg font-semibold">
          Delete this{" "}
          {feedbackId && !commentId && !replyId ? "feedback" : "comment"}
        </p>
        <p className="text-dark-blue mb-6 text-sm">
          Are you sure you want to delete this{" "}
          {feedbackId && !commentId && !replyId ? "feedback" : "comment"}? This
          action cannot be undone.
        </p>

        <div className="flex items-center justify-between px-4">
          <button
            onClick={closeModal}
            className="text-dark-blue ring-blue-gray/40 cursor-pointer rounded-lg px-4 py-2 text-sm font-semibold ring-1"
          >
            Cancel
          </button>
          <button
            onClick={handleDeleteComment}
            className="cursor-pointer rounded-lg border-1 bg-red-400 px-4 py-2 text-sm font-semibold text-white hover:bg-red-400/80"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
