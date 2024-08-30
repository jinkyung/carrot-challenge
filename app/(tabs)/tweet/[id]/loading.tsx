import TweetListPlaceholder from "@/components/tweet-list-placeholder";

export default function Loading() {
  return (
    <main className="flex flex-col w-full gap-10 px-6 py-8">
      <TweetListPlaceholder pageSize={1} />
    </main>
  );
}
