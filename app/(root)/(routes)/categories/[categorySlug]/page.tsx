import { SearchBox } from "@/components/ui/search-box";
import getSingleCategory from "@/lib/actions/get-single-category";
import { PostGrid } from "./_components/post-grid";
import { Separator } from "@/components/ui/separator";

const CategoryPage = async ({ params }: { params: { categorySlug: string } }) => {
  const { categorySlug } = params;
  const category = await getSingleCategory(categorySlug);

  return (
    <div className="flex flex-1 h-full">
      <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-4 flex-1 size-full">
        <h1 className="font-semibold text-4xl">{categorySlug}</h1>
        <SearchBox className="w-fit" />
        <div className="flex justify-between h-[91%]">
          <div className="w-8/12">
            {category?.posts && <PostGrid posts={category?.posts} categoryId={category.id} />}
          </div>
          <Separator orientation="vertical" />
          <aside className="space-y-4 w-1/4">
            <h2 className="text-2xl font-semibold">Information</h2>
            <p className="text-neutral-600">{category?.description}</p>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
