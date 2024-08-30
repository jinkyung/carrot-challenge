import AddTweet from "@/components/add-tweet";

export default async function Write() {
  return (
    <main className="flex flex-col w-full gap-10 px-6 py-8">
      <AddTweet />
    </main>
  );
}
