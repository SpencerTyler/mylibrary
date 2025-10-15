import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function getSession() {
  const session = await auth.api.getSession({ headers: await headers() });

  return session;
}

export async function isLoggedIn() {
  const session = await getSession();

  return session != null;
}

export async function enforceLogin() {
  const loggedIn = await isLoggedIn();

  if (!loggedIn) {
    redirect("/login");
  }
}
