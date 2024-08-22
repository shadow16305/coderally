import { Category, CategoryFollower } from "@prisma/client";
import Link from "next/link";
import { ActionPopover } from "./action-popover";
import { Session } from "next-auth";

interface CategoryGridProps {
  categories: (Category & { _count: { followers: number } })[];
  userId: string | undefined;
  categoryFollowers: CategoryFollower[];
  isLoggedIn: Session | null;
}

export const CategoryGrid = ({ categories, userId, categoryFollowers, isLoggedIn }: CategoryGridProps) => {
  return (
    <section className="flex flex-wrap gap-4">
      {categories.map((category) => (
        <div key={category.id} className="ring-1 ring-neutral-950/5 rounded-md hover:bg-neutral-100 transition-colors">
          <div className="flex justify-between items-start gap-x-2 pl-4 pr-2 py-2">
            <Link href={`/categories/${category.name}`}>
              <p className="leading-none">{category.name}</p>
              <span className="text-xs text-neutral-600">Followers: {category._count.followers} </span>
            </Link>
            <ActionPopover
              category={category}
              authorId={category.authorId}
              userId={userId}
              categoryFollowers={categoryFollowers.filter((follower) => follower.categoryId === category.id)}
              isLoggedIn={isLoggedIn}
            />
          </div>
        </div>
      ))}
    </section>
  );
};
