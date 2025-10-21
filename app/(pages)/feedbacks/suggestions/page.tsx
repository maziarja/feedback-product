import Navbar from "@/app/_components/suggestions/Navbar";
import FeedbacksList from "@/app/_components/suggestions/FeedbacksList";
import Roadmap from "@/app/_components/suggestions/Roadmap";
import CategoryTags from "@/app/_components/suggestions/CategoryTags";
import Logo from "@/app/_components/suggestions/Logo";
import { ProductRequestType } from "@/lib/types";
import { SortBy } from "@/app/_components/suggestions/SortbyDropDown";
import Sidebar from "@/app/_components/suggestions/Sidebar";

type PageProps = {
  searchParams: Promise<{
    filterBy: ProductRequestType["category"] | "all";
    sortBy: SortBy;
  }>;
};

async function Page({ searchParams }: PageProps) {
  const { filterBy, sortBy } = await searchParams;

  return (
    <div className="relative md:px-10 md:py-15 lg:flex lg:justify-center lg:gap-7.5">
      <Navbar />
      <Sidebar filterBy={filterBy}>
        <Roadmap />
      </Sidebar>
      <div className="mb-10 hidden gap-2.5 md:flex lg:max-w-[255px] lg:flex-col lg:gap-6 lg:self-start">
        <Logo />
        <CategoryTags filterBy={filterBy} />
        <Roadmap />
      </div>
      <div className="w-full lg:max-w-[825px]">
        <FeedbacksList filterBy={filterBy} sortBy={sortBy} />
      </div>
    </div>
  );
}

export default Page;
