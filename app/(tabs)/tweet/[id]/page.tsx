import db from "@/lib/db";
import { notFound } from "next/navigation";
import Tweet from "@/components/tweet";
import Like from "@/components/like";
import { getSession } from "@/lib/session";
import { unstable_cache as nextCache } from "next/cache";

async function getTweet(id: number) {
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

async function getLikeStatus(tweetId: number, userId: number) {
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

function getCachedLikeStatus(tweetId: number, userId: number) {
  const cachedOperation = nextCache(getLikeStatus, ["tweet-like-status"], {
    tags: [`like-status-${tweetId}`],
  });
  return cachedOperation(tweetId, userId);
}

export default async function TweetDetail({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return notFound();
  }
  const tweet = await getTweet(id);
  if (!tweet) {
    return notFound();
  }
  const session = await getSession();
  const { likeCount, isLiked } = await getCachedLikeStatus(id, session.id!);
  return (
    <main className="flex flex-col w-full gap-10 px-6 py-8">
      <Tweet
        tweet={tweet.tweet}
        username={tweet.user?.username}
        created_at={tweet.created_at}
      />
      <div>
        <Like isLiked={isLiked} likeCount={likeCount} tweetId={id} />
      </div>
    </main>
  );
}
