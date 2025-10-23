import { ProductRequestType } from "@/lib/types";
import Link from "next/link";

type Category = ProductRequestType["category"] | "all";

type CategoryTagsProps = {
  filterBy: Category;
};

function CategoryTags({ filterBy = "all" }: CategoryTagsProps) {
  const categoryList: Category[] = [
    "UI",
    "UX",
    "bug",
    "enhancement",
    "feature",
    "all",
  ];

  return (
    <div className="space-y-6 rounded-lg bg-white px-6 pt-4.5 pb-6 md:flex-1">
      <div className="flex flex-wrap gap-x-2 gap-y-4">
        {categoryList.map((category) => (
          <Link
            href={`/feedbacks/suggestions/?filterBy=${category}`}
            key={category}
            className={` ${filterBy === category ? "bg-blue text-white" : "text-blue bg-light-blue-gray"} cursor-pointer rounded-xl px-4 py-1 text-sm font-semibold hover:bg-[#CFD7FF]`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CategoryTags;
