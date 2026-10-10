import Link from "next/link";

const NotFoundPage = () => {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-4xl font-bold">পেজটি পাওয়া যায়নি</h1>
      <p className="mt-2 text-gray-500">আপনি যে পেজটি খুঁজছেন সেটি নেই।</p>
      <Link href="/" className="btn mt-5 bg-green-500 text-white">
        হোম পেজে ফিরে যান
      </Link>
    </main>
  );
};

export default NotFoundPage;
