"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ICategory } from "./NavLinks";

const CategoryNavLinks = ({ categories }: { categories: ICategory[] }) => {
  const pathname = usePathname();

  return (
    <nav className="flex gap-2 overflow-x-auto border-b border-gray-200 p-2 md:gap-4 md:p-3">
      {categories.map((category) => {
        const isActive = pathname === `/category/${category.slug}`;

        return (
          <Link
            key={category.id}
            href={`/category/${category.slug}`}
            className={`flex shrink-0 items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition ${
              isActive
                ? "bg-green-600 text-white"
                : "text-gray-800 hover:bg-green-50 hover:text-green-700"
            }`}
          >
            <span>{category.icon}</span>
            <span>{category.nameBn}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default CategoryNavLinks;
