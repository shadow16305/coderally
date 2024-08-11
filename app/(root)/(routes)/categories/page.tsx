import { CategoryGrid } from "./_components/category-grid";
import getCategories from "@/lib/actions/get-categories";
import { CategoryNav } from "./_components/category-nav";

const CategoriesPage = async () => {
  const categories = await getCategories();

  return (
    <div className="flex flex-1 h-full">
      <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-4 flex-1 size-full">
        <h1 className="font-semibold text-4xl">Categories</h1>
        <CategoryNav />
        <CategoryGrid categories={categories} />
      </div>
    </div>
  );
};

export default CategoriesPage;
