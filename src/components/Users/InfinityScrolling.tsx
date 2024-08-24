import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
} from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

function InfinityScrolling({
  hasNextPage,
  isFetchingNextPage,
  isLoading,
  fetchNextPage,
}: {
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  isLoading: boolean;
  fetchNextPage: (options?: FetchNextPageOptions) => Promise<
    InfiniteQueryObserverResult<
      InfiniteData<
        {
          data: UserType[];
          page: number;
        },
        unknown
      >,
      Error
    >
  >;
}) {
  const { ref, inView } = useInView({ threshold: 1.0 });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage && !isLoading)
      fetchNextPage();
  }, [inView]);
  return <div ref={ref} className="w-4 h-4" />;
}

export default InfinityScrolling;
