"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

type currentCommentIdType = {
  currentCommentId: string;
  setCurrentCommentId: Dispatch<SetStateAction<string>>;
  replyToId: string;
  setReplyToId: Dispatch<SetStateAction<string>>;
  replyToEmail: string;
  setReplyToEmail: Dispatch<SetStateAction<string>>;
};

const CurrentCommentIdContext = createContext<currentCommentIdType | undefined>(
  undefined,
);

export function CurrentCommentIdProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentCommentId, setCurrentCommentId] = useState("");
  const [replyToId, setReplyToId] = useState("");
  const [replyToEmail, setReplyToEmail] = useState("");
  return (
    <CurrentCommentIdContext.Provider
      value={{
        currentCommentId,
        setCurrentCommentId,
        replyToId,
        setReplyToId,
        replyToEmail,
        setReplyToEmail,
      }}
    >
      {children}
    </CurrentCommentIdContext.Provider>
  );
}

export const useCurrentCommentId = () => {
  const context = useContext<currentCommentIdType | undefined>(
    CurrentCommentIdContext,
  );
  if (context === undefined)
    throw new Error(
      "currentCommentId context was used outside of currentCommentId provider",
    );
  return context;
};
