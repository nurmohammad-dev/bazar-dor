"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const UserInfo = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const router = useRouter();

  const handleSignOut = async () => {
    const { error } = await authClient.signOut();

    if(error) {
      toast.error("সাইন আউট করতে সমস্যা হয়েছে।");
      return;
    }

    router.push("/");
  };

  return (
    <div className="container mx-auto flex">
      {user ? (
        <div className="dropdown dropdown-end ml-auto">
          <div tabIndex={0} role="button" className="flex cursor-pointer items-center gap-2">
            <span className="flex h-6 w-9 items-center justify-center rounded-full bg-green-700 text-white">
              {user.name?.charAt(0).toUpperCase()}
            </span>
            <span>{user.name}</span>
            <span className="text-gray-500">▾</span>
          </div>
          <div tabIndex={0} className="dropdown-content z-10 mt-2 w-64 rounded-2xl border border-gray-200 bg-white p-4 shadow-lg">
            <p className="font-semibold text-gray-400">{user.name}</p>
            <p className="text-sm text-gray-400">{user.email}</p>
            <Link href="/profile" className="mt-3 block">
              👤 আমার প্রোফাইল
            </Link>
            <button onClick={handleSignOut} className="mt-3 block text-red-500">
              ↪ সাইন আউট
            </button>
          </div>
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
