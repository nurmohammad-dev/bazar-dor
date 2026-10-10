import Link from "next/link";

export interface IProduct {
  id: number;
  nameBn: string;
  image: string;
  today: number;
  unit: string;
  slug: string;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
}

const toBanglaNumber = (value: number | string) =>
  String(value).replace(/\d/g, (digit) => "০১২৩৪৫৬৭৮৯"[Number(digit)]);

const ProductCard = ({ product }: { product: IProduct }) => {
  return (
<Link href={`/product/${product.slug}`}>
<div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-green-500 hover:shadow-md">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 text-2xl">
          {product.image}
        </div>

        <div>
          <h3 className="text-lg font-bold">
            {product.nameBn}
          </h3>

          <p className="text-sm text-gray-500">
            প্রতি {product.unit}
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-end justify-between">

        <div>
          <p className="text-xs text-gray-500">
            আজকের দাম
          </p>

          <p className="text-lg font-bold">
            {toBanglaNumber(product.today)} টাকা
          </p>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
              product.change.dir === "up"
              ? "bg-red-50 text-red-500"
              : product.change.dir === "down"
              ? "bg-green-50 text-green-600"
              : "bg-gray-100 text-gray-500"
            }`}
            >
          {product.change.dir === "up" && "▲"}
          {product.change.dir === "down" && "▼"}
          {" "}
          {toBanglaNumber(Math.abs(product.change.pct))}%
        </span>

      </div>
    </div>
    </Link>
  );
};

export default ProductCard;