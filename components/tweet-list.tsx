"use client";

import { InitialTweets } from "@/app/(home)/page";
import { useState } from "react";
import { getTweets } from "@/app/(home)/actions";
import Link from "next/link";

interface TweetListProps {
  initialTweets: InitialTweets;
}

export default function TweetList({ initialTweets }: TweetListProps) {
  const [tweets, setTweets] = useState(initialTweets);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const goPage = async (isNext: boolean) => {
    setIsLoading(true);
    const newTweets = await getTweets(page + (isNext ? 1 : -1));
    setTweets(newTweets);
    setPage((page) => page + (isNext ? 1 : -1));
    setIsLoading(false);
  };
  return (
    <div className="p-5 flex flex-col gap-5">
      {isLoading
        ? "loading..."
        : tweets.map((tweet) => (
            <Link key={tweet.id} href={`/tweet/${tweet.id}`}>
              {tweet.tweet}
            </Link>
          ))}
      <div className="flex justify-between">
        {page !== 0 ? (
          <button
            onClick={() => goPage(false)}
            disabled={isLoading}
            className="text-sm font-semibold bg-orange-500 w-fit mx-auto px-3 py-2 rounded-md hover:opacity-90 active:scale-95"
          >
            prev
          </button>
        ) : null}
        <button
          onClick={() => goPage(true)}
          disabled={isLoading}
          className="text-sm font-semibold bg-orange-500 w-fit mx-auto px-3 py-2 rounded-md hover:opacity-90 active:scale-95"
        >
          next
        </button>
      </div>
    </div>
  );
}
