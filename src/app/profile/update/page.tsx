"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

const ProfileUpdatePage = () => {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;

    if (!name.trim()) {
      toast.error("নাম লিখুন।");
      return;
    }

    const { data, error } = await authClient.updateUser({
      name: name.trim(),
    });

    if (data) {
      toast.success("নাম সফলভাবে আপডেট হয়েছে!");
      router.push("/profile");
    }

    if (error) {
      toast.error("নাম আপডেট করতে সমস্যা হয়েছে।");
    }
  };

  return (
    <main className="min-h-[60vh] bg-green-50/30 px-4 py-6">
      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-5xl rounded-2xl border border-gray-200 bg-white p-6"
      >
        <h1 className="text-2xl font-bold">নাম হালনাগাদ করুন</h1>
        <label className="label mt-3">নাম</label>
        <input
          name="name"
          type="text"
          className="input w-full"
          defaultValue={user?.name}
          placeholder="আপনার নাম"
          required
        />
        <button
          type="submit"
          className="btn mt-3 bg-green-700 text-white hover:bg-green-600"
        >
          তথ্য আপডেট করুন
        </button>
        <Link href="/profile" className="btn btn-ghost mt-3 ml-2">
          ফিরে যান
        </Link>
      </form>
    </main>
  );
};

export default ProfileUpdatePage;
