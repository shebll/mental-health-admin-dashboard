"use client";
import PostSkeleton from "@/components/Post/PostSkeleton";
import SearchFilter from "@/components/Post/SearchFilter";
import { useInView } from "react-intersection-observer";

import usePosts from "@/hooks/usePosts";
import { useState, useRef, useCallback, useEffect } from "react";
import PageTitle from "@/components/ui/PageTitle";
import PostCard from "@/components/Post/PostCard";

export default function Home() {
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<string>("");
  const [isConfusionFilter, setIsConfusionFilter] = useState<boolean>(false);
  const { posts, loading, hasMore, setPosts } = usePosts(
    page,
    query,
    isConfusionFilter
  );

  const { ref, inView } = useInView({
    threshold: 1.0,
  });

  useEffect(() => {
    if (inView && hasMore && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView, hasMore, loading]);

  const handleDelete = (postId: string) => {
    console.log(posts.filter((post) => post.id !== postId));
    setPosts([...posts.filter((post) => post.id !== postId)]);
  };

  return (
    <div className="container max-w-[600px] mx-auto p-0 flex flex-col gap-4">
      <PageTitle title="Forums" />
      <div className="flex flex-col gap-4">
        {posts.map((post, index) => (
          <PostCard key={post.id} post={post} onDelete={handleDelete} />
        ))}

        <div className="flex flex-col gap-4">
          {loading && (
            <>
              <PostSkeleton />
              <PostSkeleton />
              <PostSkeleton />
              <PostSkeleton />
              <PostSkeleton />
              <PostSkeleton />
              <PostSkeleton />
              <PostSkeleton />
              <PostSkeleton />
              <PostSkeleton />
            </>
          )}
        </div>
        <div ref={ref} />
      </div>
    </div>
  );
}
