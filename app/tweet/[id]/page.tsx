import db from "@/lib/db";
import { notFound } from "next/navigation";

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

export default async function Tweet({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return notFound();
  }
  const tweet = await getTweet(id);
  if (!tweet) {
    return notFound();
  }
  return (
    <main className="flex flex-col w-full max-w-md gap-10 px-6 py-8 mx-auto mt-5">
      <div className="bg-neutral-100 h-10 w-full px-3 flex items-center text-sm rounded-md">
        {tweet.tweet}
      </div>
      <div className="text-sm flex justify-end text-gray-700">
        tweet by {tweet.user?.username}
      </div>
    </main>
  );
}
