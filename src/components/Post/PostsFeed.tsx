import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import PostCard from "@/components/Post/PostCard";
import PostSkeleton from "@/components/Post/PostSkeleton";
import InfinityScrolling from "../layout/InfinityScrolling";
import { useAuth } from "@/context/AuthContext";
import { usePostFilters } from "./usePostFilter";
import { fetchPosts } from "@/lib/api";

function PostsFeed() {
  const { filters } = usePostFilters();
  const { token } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);

  const {
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    data,
    isError,
    isLoading,
    error,
    refetch,
  } = useInfiniteQuery({
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      fetchPosts(pageParam, 20, filters, token as string),
    getNextPageParam: (data) => (data.hasNext ? data.page + 1 : undefined),
    queryKey: ["posts", filters, token],
    enabled: !!token,
  });

  const handleDelete = (postId: string) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  };

  return (
    <div className="flex-1 ">
      <div className="flex flex-col gap-4">
        {data?.pages
          .flatMap((page) => page.data)
          .map((post) => (
            <PostCard key={post.id} post={post} onDelete={handleDelete} />
          ))}
        {data?.pages[0].data.length === 0 && !isLoading && (
          <p>No Posts Found</p>
        )}
        {(isLoading || isFetchingNextPage) && (
          <div className="flex flex-col gap-4">
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
          </div>
        )}
      </div>
      <InfinityScrolling
        hasNextPage={hasNextPage}
        isLoading={isLoading}
        fetchNextPage={fetchNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />
    </div>
  );
}

export default PostsFeed;
