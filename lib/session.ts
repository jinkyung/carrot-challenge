import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import db from "@/lib/db";

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
    returnValue = await db.user.findUnique({
      where: {
        id: session.id,
      },
    });
  }
  return returnValue;
};
