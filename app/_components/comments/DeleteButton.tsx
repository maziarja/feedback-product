"use client";

import { useState } from "react";
import { MdDelete } from "react-icons/md";
import DeleteModal from "./DeleteModal";

function DeleteButton({
  commentId,
  replyId,
}: {
  commentId?: string;
  replyId?: string;
}) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const closeModal = () => setShowDeleteModal(false);
  return (
    <>
      {showDeleteModal && (
        <DeleteModal
          closeModal={closeModal}
          commentId={commentId}
          replyId={replyId}
        />
      )}
      <button
        onClick={() => setShowDeleteModal(true)}
        className="flex cursor-pointer items-center gap-1"
      >
        <MdDelete className="fill-red-400" size={16} />
        <p className="text-sm font-semibold text-red-400">Delete</p>
      </button>
    </>
  );
}

export default DeleteButton;
