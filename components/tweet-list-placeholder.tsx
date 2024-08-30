export default function TweetListPlaceholder({ pageSize = 3 }) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-6 *:rounded-md">
        {Array(pageSize)
          .fill(0)
          .map((e, i) => (
            <div key={i} className="bg-neutral-300 h-20 w-full" />
          ))}
      </div>
    </div>
  );
}
