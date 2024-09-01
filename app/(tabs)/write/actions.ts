"use server";

import db from "@/lib/db";
import { getUser } from "@/lib/session";
import { redirect } from "next/navigation";
import { z } from "zod";
import { revalidateTag } from "next/cache";

const formSchema = z.object({
  tweet: z.string({ required_error: "tweet must not empty" }),
});

export async function uploadTweet(prevState: any, formData: FormData) {
  const data = {
    tweet: formData.get("tweet"),
  };
  const result = await formSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const user = await getUser();
    if (user) {
      await db.tweet.create({
        data: {
          tweet: result.data.tweet,
          user: {
            connect: {
              id: user.id,
            },
          },
        },
      });
      revalidateTag("get-tweet-list");
      redirect("/");
    }
  }
}
