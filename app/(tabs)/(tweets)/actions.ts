"use server";

import db from "@/lib/db";
import { getUser } from "@/lib/session";
import { redirect } from "next/navigation";
import { z } from "zod";
import { Prisma } from "@prisma/client";

export type InitialTweets = Prisma.PromiseReturnType<typeof getTweets>;

export async function getTweetCount() {
  const tweetCount = await db.tweet.count();
  return tweetCount;
}

export async function getTweets(page: number, pageSize = 3) {
  const tweets = await db.tweet.findMany({
    select: {
      id: true,
      tweet: true,
      created_at: true,
      user: true,
    },
    skip: page * pageSize,
    take: pageSize,
    orderBy: {
      created_at: "desc",
    },
  });

  return tweets;
}

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
      const tweet = await db.tweet.create({
        data: {
          tweet: result.data.tweet,
          user: {
            connect: {
              id: user.id,
            },
          },
        },
        select: {
          id: true,
        },
      });
      redirect("/");
    }
  }
}
