import TweetList from "@/components/tweet-list";
import { getCachedTweetCount, getCachedTweets } from "./actions";

export default async function Home() {
  const pageSize = 3;

  const [totalCount, initialTweets] = await Promise.all([
    getCachedTweetCount(),
    getCachedTweets(0, pageSize),
  ]);
  return (
    <main className="flex flex-col w-full gap-10 px-6 py-8">
      <TweetList
        initialTweets={initialTweets}
        pageSize={pageSize}
        totalCount={totalCount}
      />
    </main>
  );
}
