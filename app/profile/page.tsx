import db from "@/lib/db";
import { getSession, getUser } from "@/lib/session";
import { notFound, redirect } from "next/navigation";

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
    <div>
      <h1>welcome! {user?.username}</h1>
      <form action={logOut}>
        <button>Log out</button>
      </form>
    </div>
  );
}
