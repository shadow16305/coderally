import { Category } from "@prisma/client";
import Link from "next/link";
import { ActionPopover } from "./action-popover";

interface CategoryGridProps {
  categories: Category[];
  userId: string;
}

export const CategoryGrid = ({ categories, userId }: CategoryGridProps) => {
  return (
    <section className="flex flex-wrap gap-4">
      {categories.map((category) => (
        <div key={category.id} className="ring-1 ring-neutral-950/5 rounded-md hover:bg-neutral-100 transition-colors">
          <div className="flex justify-between items-start gap-x-2 pl-4 pr-2 py-2">
            <Link href={`/categories/${category.name}`}>
              <p className="leading-none">{category.name}</p>
              <span className="text-xs text-neutral-600">Followers: {category.followers ? category.followers : 0}</span>
            </Link>
            <ActionPopover categoryId={category.id} authorId={category.authorId} userId={userId} />
          </div>
        </div>
      ))}
    </section>
  );
};
