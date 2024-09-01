import Input from "./input";
import Button from "./button";
import { PlusIcon } from "@heroicons/react/24/solid";

export default function CommentListPlaceholder({ pageSize = 3 }) {
  return (
    <>
      <div>
        <div className="flex items-center gap-1">
          <div className="w-full">
            <Input
              name="comment-placeholder"
              placeholder="comment"
              type="text"
              readOnly
            />
          </div>
          <div className="flex-none">
            <Button text="">
              <PlusIcon className="size-5" />
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        {Array(pageSize)
          .fill(0)
          .map((e, i) => (
            <div
              className="bg-neutral-300 p-3 rounded text-sm text-gray-800 flex flex-col"
              key={i}
            >
              <div className="text-xs text-gray-800 mb-1">&nbsp;</div>
              <div className="font-medium text-gray-900">&nbsp;</div>
              <div className="flex gap-2 justify-end text-xs text-gray-700">
                &nbsp;
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
