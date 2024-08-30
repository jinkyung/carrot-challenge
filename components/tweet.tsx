export default function Tweet({
  tweet,
  username,
  created_at,
}: {
  tweet: string;
  username?: string;
  created_at: Date;
}) {
  return (
    <div className="bg-neutral-100 w-full p-3 flex flex-col gap-3 rounded-md">
      <div className="font-medium">{tweet}</div>
      <div className="text-gray-400 text-sm flex gap-1.5 justify-end">
        <span>Written</span>
        {username ? (
          <>
            <span>by</span>
            <span className="text-orange-400 font-medium">{username}</span>
          </>
        ) : null}
        <span>at</span>
        <span className="text-gray-700">{created_at.toLocaleDateString()}</span>
      </div>
    </div>
  );
}
