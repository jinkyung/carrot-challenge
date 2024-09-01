import { notFound } from "next/navigation";
import { getSession, getUser } from "@/lib/session";
import {
  getCachedTweet,
  getCachedLikeStatus,
  getCachedComments,
} from "./actions";
import Tweet from "@/components/tweet";
import TweetListPlaceholder from "@/components/tweet-list-placeholder";
import Like from "@/components/like";
import CommentList from "@/components/comment-list";
import CommentListPlaceholder from "@/components/comment-list-placeholder";
import { Suspense } from "react";
import LikePlaceholder from "@/components/like-placeholder";

async function TweetWithData({ id }: { id: number }) {
  const tweet = await getCachedTweet(id);
  if (!tweet) {
    return notFound();
  }
  return (
    <Tweet
      tweet={tweet.tweet}
      username={tweet.user?.username}
      created_at={tweet.created_at}
    />
  );
}

async function LikeWithData({ id }: { id: number }) {
  const session = await getSession();
  const { likeCount, isLiked } = await getCachedLikeStatus(id, session.id!);
  return <Like isLiked={isLiked} likeCount={likeCount} tweetId={id} />;
}

async function CommentWithData({ id }: { id: number }) {
  const comments = await getCachedComments(id);
  const user = await getUser();
  return (
    <CommentList tweetId={id} comments={comments} username={user?.username} />
  );
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
  return (
    <main className="flex flex-col w-full gap-10 px-6 py-8">
      <div>
        <h1 className="font-bold text-xl mb-1.5">Tweet</h1>
        <Suspense fallback={<TweetListPlaceholder pageSize={1} />}>
          <TweetWithData id={id} />
        </Suspense>
      </div>
      <div className="flex flex-col gap-3">
        <Suspense fallback={<LikePlaceholder />}>
          <LikeWithData id={id} />
        </Suspense>
        <Suspense fallback={<CommentListPlaceholder />}>
          <CommentWithData id={id} />
        </Suspense>
      </div>
    </main>
  );
}
