"use client";

import {
  QueueListIcon as SolidListIcon,
  PencilIcon as SolidPencilIcon,
  UserIcon as SolidUserIcon,
} from "@heroicons/react/24/solid";
import {
  QueueListIcon as OutlineListIcon,
  PencilIcon as OutlinePencilIcon,
  UserIcon as OutlineUserIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TabBar() {
  const pathname = usePathname();
  return (
    <div className="fixed bottom-0 z-10 w-full max-w-md grid grid-cols-3 border-neutral-600 border-t px-5 py-3 *:text-white bg-neutral-800">
      <Link href="/" className="flex flex-col items-center gap-1 text-sm">
        {pathname === "/" ? (
          <SolidListIcon className="size-6" />
        ) : (
          <OutlineListIcon className="size-6" />
        )}
        <span>Tweets</span>
      </Link>
      <Link href="/write" className="flex flex-col items-center gap-1 text-sm">
        {pathname === "/write" ? (
          <SolidPencilIcon className="size-6" />
        ) : (
          <OutlinePencilIcon className="size-6" />
        )}
        <span>Write</span>
      </Link>
      <Link
        href="/profile"
        className="flex flex-col items-center gap-1 text-sm"
      >
        {pathname === "/profile" ? (
          <SolidUserIcon className="size-6" />
        ) : (
          <OutlineUserIcon className="size-6" />
        )}
        <span>Profile</span>
      </Link>
    </div>
  );
}
