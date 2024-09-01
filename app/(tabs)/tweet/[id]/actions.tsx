"use server";

import db from "@/lib/db";
import { getSession } from "@/lib/session";
import { revalidateTag } from "next/cache";
import { getUser } from "@/lib/session";
import { z } from "zod";
import { unstable_cache as nextCache } from "next/cache";
import { Prisma } from "@prisma/client";

export type InitialComments = Prisma.PromiseReturnType<
  typeof getCachedComments
>;

export async function getTweet(id: number) {
  const tweet = await db.tweet.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
  });
  return tweet;
}

export async function getCachedTweet(tweetId: number) {
  const cachedOperation = nextCache(getTweet, ["get-tweet-detail"], {
    tags: [`tweet-detail-${tweetId}`],
  });
  return cachedOperation(tweetId);
}

export async function getLikeStatus(tweetId: number, userId: number) {
  const isLiked = await db.like.findUnique({
    where: {
      id: {
        tweetId,
        userId,
      },
    },
  });
  const likeCount = await db.like.count({
    where: {
      tweetId,
    },
  });
  return {
    likeCount,
    isLiked: Boolean(isLiked),
  };
}

export async function getCachedLikeStatus(tweetId: number, userId: number) {
  const cachedOperation = nextCache(getLikeStatus, ["tweet-like-status"], {
    tags: [`like-status-${tweetId}`],
  });
  return cachedOperation(tweetId, userId);
}

export async function getComments(tweetId: number) {
  const comments = await db.comment.findMany({
    select: {
      id: true,
      comment: true,
      updated_at: true,
      user: {
        select: {
          username: true,
        },
      },
    },
    where: {
      tweetId,
    },
    orderBy: {
      updated_at: "desc",
    },
  });
  return comments;
}

export async function getCachedComments(tweetId: number) {
  const cachedOperation = nextCache(getComments, ["get-comment-list"], {
    tags: [`get-comment-list-${tweetId}`],
  });
  return cachedOperation(tweetId);
}

const formSchema = z.object({
  comment: z.string({ required_error: "comment must not empty" }),
});

export async function uploadComment(prevState: any, formData: FormData) {
  const tweetId = formData.get("tweetId");
  const data = {
    comment: formData.get("comment"),
  };
  const result = await formSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const user = await getUser();
    if (user && tweetId) {
      await db.comment.create({
        data: {
          comment: result.data.comment,
          user: {
            connect: {
              id: user.id,
            },
          },
          tweet: {
            connect: {
              id: Number(tweetId),
            },
          },
        },
      });
      revalidateTag(`get-comment-list-${tweetId}`);
    }
  }
}

export async function like(tweetId: number) {
  await new Promise((r) => setTimeout(r, 10000));
  const session = await getSession();
  try {
    await db.like.create({
      data: {
        tweetId,
        userId: session.id!,
      },
    });
    revalidateTag(`like-status-${tweetId}`);
  } catch (e) {}
}

export async function dislike(tweetId: number) {
  await new Promise((r) => setTimeout(r, 10000));
  try {
    const session = await getSession();
    await db.like.delete({
      where: {
        id: {
          tweetId,
          userId: session.id!,
        },
      },
    });
    revalidateTag(`like-status-${tweetId}`);
  } catch (e) {}
}
