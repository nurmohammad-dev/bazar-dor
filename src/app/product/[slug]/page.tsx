import Link from "next/link";

interface IProduct {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  image: string;
  unit: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
  markets: {
    market: string;
    division: string;
    min: number;
    max: number;
  }[];
}

const getUnit = (unit: string) => {
  if (unit === "kg") return "কেজি";
  if (unit === "litre") return "লিটার";
  if (unit === "piece") return "পিস";
  if (unit === "dozen") return "ডজেন";
  return unit;
};

const toBanglaNumber = (value: number | string) =>
  String(value).replace(/\d/g, (digit) => "০১২৩৪৫৬৭৮৯"[Number(digit)]);

const ProductDetailsPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  const productsRes = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/products",
    { cache: "no-store" },
  );

  if (!productsRes.ok) {
    return <ProductNotFound />;
  }

  const products: IProduct[] = await productsRes.json();

  const productInfo = products.find((item) => item.slug === slug);

  if (!productInfo) {
    return <ProductNotFound />;
  }

  const productRes = await fetch(
    `https://api.api-store.workers.dev/api/bazardor/products/${productInfo.id}`,
    { cache: "no-store" },
  );

  if (!productRes.ok) {
    return <ProductNotFound />;
  }

  const product: IProduct = await productRes.json();
  const unit = getUnit(product.unit);
  const marketPrices = product.markets.flatMap((market) => [
    market.min,
    market.max,
  ]);
  const lowestPrice = Math.min(...marketPrices);
  const highestPrice = Math.max(...marketPrices);
  const averagePrice = Math.round(
    marketPrices.reduce((total, price) => total + price, 0) /
      marketPrices.length,
  );
  const changeText =
    product.change.dir === "up"
      ? "দাম বেড়েছে"
      : product.change.dir === "down"
        ? "দাম কমেছে"
        : "দাম অপরিবর্তিত";

  return (
    <main className="min-h-screen bg-[#f4f8f4] px-4 py-5">
      <div className="mx-auto max-w-7xl">
        <div className="mb-5 text-sm text-gray-600">
          <Link href="/" className="hover:text-green-600">
            হোম
          </Link>
          <span className="mx-2">›</span>
          <Link
            href={`/category/${product.category}`}
            className="hover:text-green-600"
          >
            {product.categoryNameBn}
          </Link>
          <span className="mx-2">›</span>
          <span>{product.nameBn}</span>
        </div>

        <section className="rounded-xl border border-[#dce7dd] bg-[#fbfdfb] p-4 shadow-sm md:p-5">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#f0f5f0] text-3xl">
                {product.image || product.categoryIcon}
              </div>

              <div>
                <h1 className="text-2xl font-bold md:text-3xl">
                  {product.nameBn}
                </h1>
                <p className="text-sm text-gray-500">
                  প্রতি {unit} · {product.categoryNameBn}
                </p>
                <p className="text-xs text-gray-500">
                  গতকালের তুলনায় আজকের দাম {changeText}{" "}
                  {toBanglaNumber(Math.abs(product.change.pct))}%
                </p>
              </div>
            </div>

            <div
              className={`rounded-xl px-5 py-3 text-center ${
                product.change.dir === "up"
                  ? "bg-[#f0f6f0] text-gray-800"
                  : product.change.dir === "down"
                    ? "bg-[#f0f6f0] text-gray-800"
                    : "bg-[#f0f6f0] text-gray-500"
              }`}
            >
              <p className="text-xs">আজকের দাম</p>
              <p className="text-xl font-bold">
                {toBanglaNumber(product.today)} টাকা
              </p>
              <p
                className={
                  product.change.dir === "up"
                    ? "text-xs text-red-500"
                    : "text-xs text-green-600"
                }
              >
                {product.change.dir === "up"
                  ? "▲"
                  : product.change.dir === "down"
                    ? "▼"
                    : "—"}{" "}
                {toBanglaNumber(Math.abs(product.change.pct))}%
              </p>
            </div>
          </div>

          <div className="mt-5 border-t border-[#dce7dd] pt-4">
            <h2 className="mb-3 text-base font-bold">দামের সারসংক্ষেপ</h2>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              <PriceSummary
                label="সর্বনিম্ন দাম"
                value={lowestPrice}
                unit={unit}
              />
              <PriceSummary
                label="সর্বাধিক দাম"
                value={highestPrice}
                unit={unit}
              />
              <PriceSummary label="গড় দাম" value={averagePrice} unit={unit} />
            </div>
          </div>

          <div className="mt-7">
            <h2 className="mb-3 text-lg font-bold">বাজারভিত্তিক আজকের দাম</h2>

            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full min-w-[640px] text-sm">
                <thead className="bg-gray-50 text-left text-gray-600">
                  <tr>
                    <th className="px-4 py-3 font-medium">বাজার</th>
                    <th className="px-4 py-3 font-medium">বিভাগ</th>
                    <th className="px-4 py-3 font-medium">সর্বনিম্ন</th>
                    <th className="px-4 py-3 font-medium">সর্বোচ্চ</th>
                    <th className="px-4 py-3 font-medium">গড়</th>
                  </tr>
                </thead>
                <tbody>
                  {product.markets.map((market, index) => (
                    <tr
                      key={`${market.market}-${market.division}`}
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="px-4 py-3">{market.market}</td>
                      <td className="px-4 py-3 text-gray-500">
                        {market.division}
                      </td>
                      <td className="px-4 py-3">{market.min} টাকা</td>
                      <td className="px-4 py-3">{market.max} টাকা</td>
                      <td className="px-4 py-3 font-medium">
                        {Math.round((market.min + market.max) / 2)} টাকা
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <Link
          href={`/category/${product.category}`}
          className="mt-5 inline-flex items-center gap-2 rounded-lg border-2 border-gray-300 bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-800 shadow-sm transition hover:border-gray-400 hover:bg-gray-300"
        >
          <span>{product.categoryIcon}</span>
          <span>সব {product.categoryNameBn}</span>
        </Link>
      </div>
    </main>
  );
};

const PriceSummary = ({
  label,
  value,
  unit,
}: {
  label: string;
  value: number;
  unit: string;
}) => (
  <div className="rounded-xl border-2 border-[#dce7dd] bg-[#fbfdfb] p-3">
    <p className="text-xs text-gray-500">{label}</p>
    <p className="mt-1 text-lg font-bold text-green-600">
      {toBanglaNumber(value)} টাকা
    </p>
    <p className="text-xs text-gray-400">প্রতি {unit}</p>
  </div>
);

const ProductNotFound = () => (
  <div className="mx-auto max-w-7xl px-4 py-16 text-center">
    <h1 className="text-3xl font-bold">Product পাওয়া যায়নি</h1>
    <p className="mt-2 text-gray-500">এই পণ্যটি খুঁজে পাওয়া যায়নি।</p>
    <Link href="/" className="btn mt-5 bg-green-500 text-white">
      হোম পেজে ফিরুন
    </Link>
  </div>
);

export default ProductDetailsPage;
