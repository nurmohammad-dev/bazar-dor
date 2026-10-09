import Link from "next/link";


interface Icategory {
    id: string;
    nameBn: string;
    slug: string;
    icon: string;
} 



const NavLinksPage = async() => {
    const res = await fetch("https://api.api-store.workers.dev/api/bazardor/categories");
    const data: Icategory[] = await res.json();
    return (
        <div className="flex gap-10 p-4 border-b border-gray-200">
            {data.map((category) => (
                <Link key={category.id} href={category.slug}>{category.icon}{category.nameBn}</Link>
            ))}
        </div>
    );
};

export default NavLinksPage;