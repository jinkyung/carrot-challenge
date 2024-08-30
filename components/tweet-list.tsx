"use client";

import { useState } from "react";
import { getTweets, InitialTweets } from "@/app/(tabs)/(tweets)/actions";
import Link from "next/link";
import TweetListPlaceholder from "@/components/tweet-list-placeholder";
import Tweet from "@/components/tweet";

interface TweetListProps {
  initialTweets: InitialTweets;
  pageSize: number;
  totalCount: number;
}

export default function TweetList({
  initialTweets,
  pageSize,
  totalCount,
}: TweetListProps) {
  const [tweets, setTweets] = useState(initialTweets);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const goPage = async (isNext: boolean) => {
    setIsLoading(true);
    const newTweets = await getTweets(page + (isNext ? 1 : -1), pageSize);
    setTweets(newTweets);
    setPage((page) => page + (isNext ? 1 : -1));
    setIsLoading(false);
  };

  if (isLoading) return <TweetListPlaceholder pageSize={pageSize} />;
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-6 *:rounded-md">
        {tweets.map((tweet) => (
          <Link key={tweet.id} href={`/tweet/${tweet.id}`}>
            <Tweet
              tweet={tweet.tweet}
              username={tweet.user?.username}
              created_at={tweet.created_at}
            />
          </Link>
        ))}
        <div className="flex justify-between">
          {page !== 0 ? (
            <button onClick={() => goPage(false)} disabled={isLoading}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5 8.25 12l7.5-7.5"
                />
              </svg>
            </button>
          ) : (
            <div />
          )}
          {/* <div>{page + 1}</div> */}
          {totalCount <= pageSize * page + tweets.length ? (
            <div />
          ) : (
            <button onClick={() => goPage(true)} disabled={isLoading}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
