import { CategoryGrid } from "./_components/category-grid";
import getCategories from "@/lib/actions/get-categories";
import { CategoryNav } from "./_components/category-nav";
import getCurrentUser from "@/lib/actions/get-current-user";
import getFollowedCategories from "@/lib/actions/get-followed-categories";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const CategoriesPage = async () => {
  const categories = await getCategories();
  const currentUser = await getCurrentUser();
  const categoryFollowers = await getFollowedCategories();
  const session = await getServerSession(authOptions);

  return (
    <div className="flex flex-1 h-full">
      <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-4 flex-1 size-full">
        <h1 className="font-semibold text-3xl lg:text-4xl">Categories</h1>
        <CategoryNav />
        <CategoryGrid
          categories={categories}
          userId={currentUser?.id}
          categoryFollowers={categoryFollowers}
          isLoggedIn={session}
        />
      </div>
    </div>
  );
};

export default CategoriesPage;
