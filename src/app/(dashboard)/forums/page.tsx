"use client";
import PostCard from "@/components/PostCard";
import PostSkeleton from "@/components/PostSkeleton";
import SearchFilter from "@/components/SearchFilter";
import { useInView } from "react-intersection-observer";

import usePosts from "@/hooks/usePosts";
import { useState, useRef, useCallback, useEffect } from "react";

export default function Home() {
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<string>("");
  const [isConfusionFilter, setIsConfusionFilter] = useState<boolean>(false);
  const { posts, loading, hasMore } = usePosts(page, query, isConfusionFilter);

  const { ref, inView } = useInView({
    threshold: 1.0,
  });

  useEffect(() => {
    if (inView && hasMore && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView, hasMore, loading]);

  return (
    <div className="container max-w-[600px] mx-auto p-4">
      <SearchFilter
        onSearch={(val) => {
          setQuery(val);
          setPage(1);
        }}
        onFilter={(val) => {
          setIsConfusionFilter(val);
          setPage(1);
        }}
      />
      {posts.map((post, index) => (
        <PostCard key={post.id} post={post} />
      ))}
      <div ref={ref} />
      {loading && (
        <>
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
        </>
      )}
    </div>
  );
}
