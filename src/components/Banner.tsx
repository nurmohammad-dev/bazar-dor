import Image from "next/image";
import Link from "next/link";

const BannerPage = () => {

    const date = new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full",
    });

    return (
        <div className="mx-auto mt-4 flex max-w-7xl flex-col items-center justify-between gap-4 rounded-3xl border border-gray-200 bg-white px-4 py-6 shadow-sm md:flex-row md:px-6 md:py-4">
            
            <div className="w-full md:w-3/5">
                <span className="rounded-full p-2 py-1 bg-green-100 text-sm text-green-700">
                    {date}
                </span>

                <h1 className="mt-4 text-3xl font-bold leading-tight text-gray-900 md:text-4xl">
                    আজকের বাজারের দাম এক নজরে
                </h1>

                <p className="mt-4 text-base leading-relaxed text-gray-600 md:text-lg">
                    চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
                    বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং
                    দামের পরিবর্তন এক জায়গায়।
                </p>

                <Link href="#products" className="btn bg-green-900 mt-5 text-base text-white hover:bg-green-800">
                    সব পণ্য দেখুন
                </Link>
            </div>

            <div className="w-full md:w-2/5">
                <Image
                    src="/bazar-hero.png"
                    alt="Bazar Hero"
                    width={400}
                    height={300}
                    className="mx-auto"
                />
            </div>
        </div>
    );
};

export default BannerPage;