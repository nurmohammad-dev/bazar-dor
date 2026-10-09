import Link from "next/link";
import ProductCard, { IProduct } from "@/components/ProductCard";

interface ICategory {
  id: string;
  nameBn: string;
  icon: string;
}

const CategoryPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ sort?: string }>;
}) => {
  const { slug } = await params;
  const { sort } = await searchParams;

  const categoryRes = await fetch(
    `https://api.api-store.workers.dev/api/bazardor/categories/${slug}`,
    {
      cache: "no-store",
    },
  );

  if (!categoryRes.ok) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center">
        <h1 className="text-3xl font-bold">Category পাওয়া যায়নি</h1>

        <p className="mt-2 text-gray-500">এই category টি খুঁজে পাওয়া যায়নি।</p>

        <Link href="/" className="btn mt-5 bg-green-500 text-white">
          হোম পেজে ফিরুন
        </Link>
      </div>
    );
  }

  const category: ICategory = await categoryRes.json();

  const productsRes = await fetch(
    `https://api.api-store.workers.dev/api/bazardor/products?category=${slug}`,
    {
      cache: "no-store",
    },
  );

  if (!productsRes.ok) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center">
        <h1 className="text-3xl font-bold">Product পাওয়া যায়নি</h1>

        <Link href="/" className="btn mt-5 bg-green-500 text-white">
          হোম পেজে ফিরুন
        </Link>
      </div>
    );
  }

  const products: IProduct[] = await productsRes.json();

  const sortedProducts = [...products];

  if (sort === "low") {
    sortedProducts.sort((a, b) => a.today - b.today);
  }

  if (sort === "high") {
    sortedProducts.sort((a, b) => b.today - a.today);
  }

  return (
    <main className="min-h-screen bg-[#f4f8f4] px-4 py-5">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-2xl border-2 border-[#dce7dd] bg-[#fbfdfb] px-5 py-4 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#f0f5f0] text-3xl">
            {category.icon}
            </div>

            <div>
              <h1 className="text-3xl font-bold">{category.nameBn}</h1>

              <p className="text-sm text-gray-500">
                {products.length}টি পণ্যের আজকের দাম ও পরিবর্তন
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            মোট {products.length}টি পণ্য দেখানো হচ্ছে
          </p>

          <form method="GET" className="flex items-center gap-2">
            <label htmlFor="sort" className="text-sm text-gray-600">
              সাজান
            </label>
            <select
              id="sort"
              name="sort"
              defaultValue={sort || ""}
              className="h-10 rounded-xl border-2 border-gray-300 bg-[#fbfdfb] px-3 text-sm text-gray-700 shadow-sm outline-none focus:border-green-600"
            >
              <option value="">ডিফল্ট</option>
              <option value="low">দাম: কম থেকে বেশি</option>
              <option value="high">দাম: বেশি থেকে কম</option>
            </select>
            <button type="submit" className="sr-only">
              সাজান
            </button>
          </form>
        </div>

        {sortedProducts.length > 0 ? (
          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-2xl border border-dashed p-12 text-center">
            <div className="text-5xl">📦</div>

            <h2 className="mt-4 text-2xl font-bold">কোনো পণ্য পাওয়া যায়নি</h2>

            <p className="mt-2 text-gray-500">
              এই category-তে বর্তমানে কোনো পণ্য নেই।
            </p>

            <Link href="/" className="btn mt-5 bg-green-500 text-white">
              হোম পেজে ফিরুন
            </Link>
          </div>
        )}
      </div>
    </main>
  );
};

export default CategoryPage;
