import { getSuggestionsProductRequests } from "@/app/_actions/productRequest/getProductRequests";
import FeedbackContainer from "../feedbacks/FeedbackContainer";
import { ProductRequestType } from "@/lib/types";
import { SortBy } from "./SortbyDropDown";
import Header from "./Header";
import EmptySuggestion from "./EmptySuggestion";

type FeedbacksListProps = {
  filterBy: ProductRequestType["category"] | "all";
  sortBy: SortBy;
};

async function FeedbacksList({ filterBy, sortBy }: FeedbacksListProps) {
  const suggestionsFeedbacks = await getSuggestionsProductRequests(
    filterBy,
    sortBy,
  );

  return (
    <>
      <Header numOfFeedbacks={suggestionsFeedbacks?.length} />
      <div className="@container space-y-4 px-6 py-8 md:px-0">
        {suggestionsFeedbacks && suggestionsFeedbacks?.length > 0 ? (
          suggestionsFeedbacks?.map((feedback) => {
            return <FeedbackContainer key={feedback._id} feedback={feedback} />;
          })
        ) : (
          <EmptySuggestion />
        )}
      </div>
    </>
  );
}

export default FeedbacksList;
