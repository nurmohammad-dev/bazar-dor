"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";

const UserInfo = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleSignOut = async () => {
    await authClient.signOut();
  };

  return (
    <div className="container mx-auto flex">
      {user ? (
        <div className="ml-auto flex flex-col gap-2">
          <p>{user.name}</p>
          <button onClick={handleSignOut} className="btn btn-error btn-xs">
            sign out
          </button>
        </div>
      ) : (
        <div className="ml-auto flex gap-2">
          <Link href="/signin">
            <button className="btn">সাইন ইন</button>
          </Link>
          <Link href="/signup">
             <button className="btn btn-success">সাইন আপ</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
