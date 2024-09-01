import { HandThumbUpIcon as OutlineHandThumbUpIcon } from "@heroicons/react/24/outline";

export default function LikePlaceholder() {
  return (
    <div className="w-fit flex items-center gap-2 text-neutral-400 text-sm border border-neutral-400 rounded-full p-2">
      <OutlineHandThumbUpIcon className="size-5" />
      <span>좋아요</span>
    </div>
  );
}
