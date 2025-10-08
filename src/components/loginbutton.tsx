"use client";

import { authClient } from "@/lib/auth_client";
import Button from "./button";

export default function LoginButton() {
  const signIn = async () => {
    await authClient.signIn.social({ provider: "google" });
  };
  return <Button onClick={signIn}>Login</Button>;
}
