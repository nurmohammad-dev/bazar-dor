import ProductCard, { IProduct } from "./ProductCard";

const ProductSection = async () => {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/products",
  );
  const data: IProduct[] = await res.json();

  //section A: top risers
  const topRisers = data
    .filter((product) => product.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  //section B: top fallers
  const topFallers = data
    .filter((product) => product.change.dir === "down")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  return (
    <div className="container mx-auto py-8 space-y-8">
      {/* Section A */}
      <div>
        <h2 className="mb-4 text-2xl font-bold">
            <span className="text-red-500 text-sm mr-2">▲</span>
             আজকে দাম বেড়েছে</h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {topRisers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Section B */}
      <div className="mt-8">
        <h2 className="mb-4 text-2xl font-bold mt-8">
            <span className="text-green-500 text-sm mr-2">▼</span>
             আজকে দাম কমেছে</h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {topFallers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Section C */}
      <div>
        <h2>সব পণ্য</h2>

        <p>মোট {data.length}টি পণ্য দেখানো হচ্ছে</p>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {data.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductSection;
