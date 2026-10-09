import CategoryNavLinks from "./CategoryNavLinks";

export interface ICategory {
    id: string;
    nameBn: string;
    slug: string;
    icon: string;
}

const NavLinksPage = async () => {
    const res = await fetch("https://api.api-store.workers.dev/api/bazardor/categories");
    const data: ICategory[] = await res.json();

    return (
        <CategoryNavLinks categories={data} />
    );
};

export default NavLinksPage;