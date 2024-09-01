"use client";

import { InitialComments } from "@/app/(tabs)/tweet/[id]/actions";
import Comment from "@/components/comment";
import Input from "./input";
import Button from "./button";
import { PlusIcon } from "@heroicons/react/24/solid";
import { uploadComment } from "@/app/(tabs)/tweet/[id]/actions";
import { useFormState } from "react-dom";
import { useOptimistic, useRef } from "react";

export default function CommentList({
  tweetId,
  comments,
  username,
}: {
  tweetId: number;
  comments: InitialComments;
  username?: string;
}) {
  const [state, action] = useFormState(uploadComment, null);
  const [commentList, reducerFn] = useOptimistic(
    comments,
    (prevState, payload: FormData) => [
      {
        id: Date.now(),
        comment: payload.get("comment") as string,
        user: { username: username || "" },
        updated_at: new Date(),
      },
      ...prevState,
    ]
  );
  const commentInput = useRef<HTMLInputElement>(null);
  const initComment = () => {
    if (commentInput.current) commentInput.current.value = "";
  };
  const addComment = async (payload: FormData) => {
    initComment();
    reducerFn(payload);
    action(payload);
  };
  return (
    <>
      <div>
        <form action={addComment} className="flex items-center gap-1">
          <Input name="tweetId" value={tweetId} required hidden readOnly />
          <div className="w-full">
            <Input
              ref={commentInput}
              name="comment"
              required
              placeholder="comment"
              type="text"
              errors={state?.fieldErrors.comment}
            />
          </div>
          <div className="flex-none">
            <Button text="" hiddenLoading={true}>
              <PlusIcon className="size-5" />
            </Button>
          </div>
        </form>
      </div>
      <div className="flex flex-col gap-3">
        {commentList.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment.comment}
            username={comment.user.username}
            updated_at={comment.updated_at}
          />
        ))}
      </div>
    </>
  );
}
