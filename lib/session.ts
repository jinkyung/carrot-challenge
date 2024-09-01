import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import db from "@/lib/db";
import { unstable_cache as nextCache } from "next/cache";

interface SessionContent {
  id?: number;
}

export const getSession = () => {
  return getIronSession<SessionContent>(cookies(), {
    cookieName: "delicious-karrot",
    password: process.env.COOKIE_PASSWORD!,
  });
};

export const getUser = async () => {
  const session = await getSession();
  let returnValue = null;
  if (session.id) {
    returnValue = await nextCache(
      (id) =>
        db.user.findUnique({
          where: { id },
        }),
      ["get-user"],
      { tags: ["get-user"] }
    )(session.id);
  }
  return returnValue;
};
