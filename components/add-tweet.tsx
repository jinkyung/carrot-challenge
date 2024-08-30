"use client";

import { uploadTweet } from "@/app/(tabs)/(tweets)/actions";
import { useFormState } from "react-dom";
import Input from "./input";
import Button from "./button";

export default function AddTweet() {
  const [state, action] = useFormState(uploadTweet, null);
  return (
    <div>
      <form action={action} className="flex flex-col gap-3">
        <Input
          name="tweet"
          required
          placeholder="tweet"
          type="text"
          errors={state?.fieldErrors.tweet}
        />
        <Button text="작성 완료" />
      </form>
    </div>
  );
}
