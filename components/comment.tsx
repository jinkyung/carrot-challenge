export default function Comment({
  comment,
  username,
  updated_at,
}: {
  comment: string;
  username: string;
  updated_at: Date | string;
}) {
  return (
    <div className="bg-gray-100 p-3 rounded text-sm text-gray-800 flex flex-col">
      <div className="text-xs text-gray-800 mb-1">작성자: {username}</div>
      <div className="font-medium text-gray-900">{comment}</div>
      <div className="flex gap-2 justify-end text-xs text-gray-700">
        <span>{new Date(updated_at).toLocaleDateString()}</span>
        <span>{new Date(updated_at).toLocaleTimeString()}</span>
      </div>
    </div>
  );
}
