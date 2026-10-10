"use client";

import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import { FaGithub, FaGoogle } from "react-icons/fa";

const SignUpPage = () => {
  const handleSumit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const user = Object.fromEntries(formData.entries()) as {
      name: string;
      email: string;
      password: string;
      confirmPassword: string;
    };

    if (
      !user.name.trim() ||
      !user.email.trim() ||
      !user.password ||
      !user.confirmPassword
    ) {
      toast.error("সব ঘর পূরণ করুন।");
      return;
    }

    if (user.password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।");
      return;
    }

    if (user.password !== user.confirmPassword) {
      toast.error("পাসওয়ার্ড এবং নিশ্চিত পাসওয়ার্ড এক নয়।");
      return;
    }

    const { data, error } = await authClient.signUp.email({
      name: user.name.trim(),
      email: user.email.trim(),
      password: user.password,
      callbackURL: "/",
    });
    if (data) {
      toast.success("অ্যাকউন্ট সফলভাবে তৈরি হয়েছে!");
      redirect("/");
    }

    if (error) {
      toast.error("অ্যাকউন্ট তৈরি করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    }
  };

  const handleGoogleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  const handleGitHubSignIn = async () => {
    await authClient.signIn.social({
      provider: "github",
      callbackURL: "/",
    });
  };

  return (
    <div className="flex flex-col min-h-[100vh] items-center justify-center">
      <h2 className="text-2xl font-bold">অ্যাকউন্ট তৈরি করুন</h2>
      <p className="text-sm text-gray-500">
        বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন
      </p>

      <form onSubmit={handleSumit} className="mt-4">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <label className="label">নাম</label>
          <input
            name="name"
            type="text"
            className="input"
            placeholder="যেমন: রহিম উদ্দিন"
            required
          />

          <label className="label">ইমেইল</label>
          <input
            name="email"
            type="email"
            className="input"
            placeholder="you@example.com"
            required
          />

          <label className="label">পাসওয়ার্ড</label>
          <input
            name="password"
            type="password"
            className="input"
            placeholder="কমপক্ষে ৮ অক্ষর"
            minLength={8}
            required
          />

          <label className="label">পাসওয়ার্ড নিশ্চিত করুন</label>
          <input
            name="confirmPassword"
            type="password"
            className="input"
            placeholder="আবার লিখুন"
            minLength={8}
            required
          />

          <button
            type="submit"
            className="btn bg-green-700 hover:bg-green-600 text-white mt-4"
          >
            অ্যাকউন্ট তৈরি করুন
          </button>
        </fieldset>
      </form>
      <div className="mt-4 flex gap-2">
        <button onClick={handleGoogleSignIn} className="btn h-auto flex-1 py-2">
          <FaGoogle className="text-base" />
          <span className="leading-tight text-center">
            Google দিয়ে
            <br />
            চালিয়ে যান
          </span>
        </button>

        <button onClick={handleGitHubSignIn} className="btn h-auto flex-1 py-2">
          <FaGithub className="text-base" />
          <span className="leading-tight text-center">
            GitHub দিয়ে চালিয়ে যান
          </span>
        </button>
      </div>
    </div>
  );
};

export default SignUpPage;
