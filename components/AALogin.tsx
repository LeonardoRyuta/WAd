"use client";
import { useAuthModal, useLogout, useSignerStatus, useUser } from "@account-kit/react";
import React, { useEffect } from "react";

export function AALogin() {
  const user = useUser();
  const { openAuthModal } = useAuthModal();
  const signerStatus = useSignerStatus();
  const { logout } = useLogout();

  useEffect(() => {
    console.log(process.env.ALCHEMY_API_KEY);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center gap-4 justify-center text-center">
      {signerStatus.isInitializing ? (
        <>Loading...</>
      ) : user ? (
        <div className="flex flex-col gap-2 p-2">
          {/* <p className="text-xl font-bold">Success!</p>
          You are logged in as {user.email ?? "anon"}. */}
          <button className="btn btn-primary" onClick={() => logout()}>
            Log out
          </button>
        </div>
      ) : (
        <button className="btn btn-primary" onClick={openAuthModal}>
          Login
        </button>
      )}
    </main>
  );
}