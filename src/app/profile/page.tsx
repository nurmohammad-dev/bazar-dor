"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const ProfilePage = () => {
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
    <div className="min-h-[60vh] bg-green-50/30 px-4 py-6">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-bold">আমার প্রোফাইল</h1>
        <p className="text-gray-600">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>

        <div className="mt-6 flex items-center justify-between rounded-2xl border border-gray-200 bg-white p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-20 items-center justify-center rounded-full bg-green-700 text-2xl text-white">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-xl font-semibold">{user?.name}</h2>
              <p className="text-gray-500">{user?.email}</p>
            </div>
          </div>
          <button onClick={handleSignOut} className="btn btn-outline btn-error">
            ↪ সাইন আউট
          </button>
        </div>

        <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6">
          <h2 className="text-xl font-bold">নাম হালনাগাদ করুন</h2>
          <Link
            href="/profile/update"
            className="btn mt-3 bg-green-700 text-white hover:bg-green-600"
          >
            নাম হালনাগাদ করুন
          </Link>
        </div>

        <Link href="/" className="btn btn-ghost mt-3">
          হোম পেজে ফিরে যান
        </Link>
      </div>
    </div>
  );
};

export default ProfilePage;
