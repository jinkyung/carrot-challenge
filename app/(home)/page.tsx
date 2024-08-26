import AddTweet from "@/components/add-tweet";
import TweetList from "@/components/tweet-list";
import db from "@/lib/db";
import { Prisma } from "@prisma/client";

const pageSize = 3;

async function getInitialTweets() {
  const tweets = await db.tweet.findMany({
    select: {
      id: true,
      tweet: true,
      created_at: true,
      user: true,
    },
    take: pageSize,
    orderBy: {
      created_at: "desc",
    },
  });
  return tweets;
}

export type InitialTweets = Prisma.PromiseReturnType<typeof getInitialTweets>;

export default async function Home() {
  const initialTweets = await getInitialTweets();
  return (
    <main className="flex flex-col w-full max-w-md gap-10 px-6 py-8 mx-auto mt-5">
      <AddTweet />
      <TweetList initialTweets={initialTweets} pageSize={pageSize} />
    </main>
  );
}
