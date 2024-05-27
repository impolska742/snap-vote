"use client";

import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/shared";

export default function User() {
  const { data: session } = useSession();
  return (
    <>
      <pre>{JSON.stringify(session)}</pre>
      <div className="max-w-sm">
        <Button onClick={signIn}>Sign In</Button>
        <Button onClick={signOut}>Sign Out</Button>
      </div>
    </>
  );
}
