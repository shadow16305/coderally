import { Category } from "@prisma/client";
import Link from "next/link";

export const CategoryGrid = ({ categories }: { categories: Category[] }) => {
  return (
    <section className="flex flex-wrap gap-4">
      {categories.map((category) => (
        <Link
          href={`/categories/${category.name}`}
          key={category.id}
          className="ring-1 ring-neutral-950/5 rounded-md hover:bg-neutral-100 transition-colors px-4 py-2 flex flex-col">
          <p>{category.name}</p>
          <span className="text-xs text-neutral-600">Followers: {category.followers ? category.followers : 0}</span>
        </Link>
      ))}
    </section>
  );
};
