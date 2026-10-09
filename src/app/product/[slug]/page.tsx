const ProductDetailsPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  // সব product থেকে slug দিয়ে product খুঁজছি
  const productsRes = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/products",
  );

  const products = await productsRes.json();

  const productInfo = products.find(
    (item: { slug: string; id: number }) => item.slug === slug,
  );

  // product পাওয়া না গেলে
  if (!productInfo) {
    return <div>Product not found</div>;
  }

  // এবার single product API
  const productRes = await fetch(
    `https://api.api-store.workers.dev/api/bazardor/products/${productInfo.id}`,
  );

  const product = await productRes.json();

  return (
    <div className="mx-auto max-w-7xl p-6">

      <h1 className="text-3xl font-bold">
        {product.image} {product.nameBn}
      </h1>

      <p className="mt-2 text-gray-500">
        প্রতি {product.unit}
      </p>

      <p className="mt-5 text-2xl font-bold">
        {product.today} টাকা
      </p>

    </div>
  );
};

export default ProductDetailsPage;