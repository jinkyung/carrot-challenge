"use client";

import { InitialTweets } from "@/app/(home)/page";
import { useState } from "react";
import { getTweets } from "@/app/(home)/actions";
import Link from "next/link";

interface TweetListProps {
  initialTweets: InitialTweets;
  pageSize: number;
}

const LoadingSkeleton = ({ pageSize }: { pageSize: number }) => {
  return (
    <>
      {Array(pageSize)
        .fill(0)
        .map((e, i) => (
          <div key={i} className="bg-neutral-300 h-10 w-full" />
        ))}
    </>
  );
};

export default function TweetList({ initialTweets, pageSize }: TweetListProps) {
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

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-4 *:rounded-md">
        {isLoading ? (
          <LoadingSkeleton pageSize={pageSize} />
        ) : (
          tweets.map((tweet) => (
            <Link
              key={tweet.id}
              className="bg-neutral-100 h-10 w-full px-3 flex items-center text-sm"
              href={`/tweet/${tweet.id}`}
            >
              {tweet.tweet}
            </Link>
          ))
        )}
      </div>
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
        {tweets.length < pageSize ? (
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
  );
}
