"use client";
import { authClient } from "@/lib/auth-client";
import React from "react";
import toast from "react-hot-toast";

const SignInPage = () => {
  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const user = Object.fromEntries(formData.entries()) as {
      email: string;
      password: string};
    const {data, error} = await authClient.signIn.email({
        ...user,
        callbackURL: "/",
      }); 

      if(data) {
        toast.success("সাইন ইন সফল হয়েছে!");
      } 
        if(error) { 
        toast.error("ইমেইল অথবা পাসওয়ার্ড সঠিক নয়। আবার চেষ্টা করুন।");
        }
  };
  
    
  return (
    <div className="flex flex-col min-h-[60vh] items-center justify-center ">
      <h2 className="text-2xl font-bold">সাইন ইন করুন</h2>
      <p className="text-sm text-gray-500">
        বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
      </p>
      <form onSubmit={handleSubmit} className="mt-4">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <label className="label">ইমেইল</label>
          <input
            name="email"
            type="email"
            className="input"
            placeholder="you@example.com"
          />

          <label className="label">পাসওয়ার্ড</label>
          <input
            name="password"
            type="password"
            className="input"
            placeholder="কমপক্ষে ৮ অক্ষর"
          />

          <button type="submit" className="btn bg-green-700 hover:bg-green-600 text-white mt-4">
            সাইন ইন করুন
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default SignInPage;
