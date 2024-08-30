import db from "@/lib/db";
import { getSession, getUser } from "@/lib/session";
import { notFound, redirect } from "next/navigation";
import Button from "@/components/button";

export default async function Profile() {
  const user = await getUser();
  if (!user) notFound();

  const logOut = async () => {
    "use server";
    const session = await getSession();
    await session.destroy();
    redirect("/login");
  };

  return (
    <div className="flex flex-col w-full gap-10 px-6 py-8">
      <h1 className="text-xl font-bold text-center">
        Welcome, {user?.username}!
      </h1>
      <form action={logOut} className="flex flex-col">
        <Button text="Log out" />
      </form>
    </div>
  );
}
