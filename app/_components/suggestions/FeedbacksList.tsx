import { getSuggestionsProductRequests } from "@/app/_actions/productRequest/getProductRequests";
import FeedbackContainer from "../feedbacks/FeedbackContainer";
import { ProductRequestType } from "@/lib/types";
import { SortBy } from "./SortbyDropDown";
import Header from "./Header";
import EmptySuggestion from "./EmptySuggestion";
import { getUser } from "@/app/_actions/user/getUser";

type FeedbacksListProps = {
  filterBy: ProductRequestType["category"] | "all";
  sortBy: SortBy;
};

async function FeedbacksList({ filterBy, sortBy }: FeedbacksListProps) {
  const [suggestionsFeedbacks, currentUser] = await Promise.all([
    getSuggestionsProductRequests(filterBy, sortBy),
    getUser(),
  ]);

  const isUpvoted = (upvotedBy: ProductRequestType["upvotedBy"]) => {
    return currentUser ? upvotedBy.includes(currentUser?._id) : false;
  };

  return (
    <>
      <Header numOfFeedbacks={suggestionsFeedbacks?.length} />
      <div className="@container space-y-4 px-6 py-8 md:px-0">
        {suggestionsFeedbacks && suggestionsFeedbacks?.length > 0 ? (
          suggestionsFeedbacks?.map((feedback) => {
            return (
              <FeedbackContainer
                key={feedback._id}
                feedback={feedback}
                isUpvoted={isUpvoted}
              />
            );
          })
        ) : (
          <EmptySuggestion />
        )}
      </div>
    </>
  );
}

export default FeedbacksList;
