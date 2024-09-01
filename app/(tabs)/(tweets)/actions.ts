"use server";

import db from "@/lib/db";
import { Prisma } from "@prisma/client";
import { unstable_cache as nextCache } from "next/cache";

export type InitialTweets = Prisma.PromiseReturnType<typeof getTweets>;

export async function getTweetCount() {
  const tweetCount = await db.tweet.count();
  return tweetCount;
}

export async function getCachedTweetCount() {
  const cachedOperation = nextCache(getTweetCount, ["get-tweet-count"],{
    tags: [`get-tweet-count`]
  })
  return cachedOperation();
}

export async function getTweets(pageNo: number, pageSize = 3) {
  const tweets = await db.tweet.findMany({
    select: {
      id: true,
      tweet: true,
      created_at: true,
      user: true,
    },
    skip: pageNo * pageSize,
    take: pageSize,
    orderBy: {
      created_at: "desc",
    },
  });

  return tweets;
}

export async function getCachedTweets(pageNo: number, pageSize: number) {
  const cachedOperation = nextCache(getTweets, ["get-tweet-list"],{
    tags: ['get-tweet-list']
  })
  return cachedOperation(pageNo, pageSize);
}
