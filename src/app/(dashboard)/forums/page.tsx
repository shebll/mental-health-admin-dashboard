"use client";
import PostSkeleton from "@/components/Post/PostSkeleton";
import SearchFilter from "@/components/Post/SearchFilter";
import { useInView } from "react-intersection-observer";

import usePosts from "@/hooks/usePosts";
import { useState, useRef, useCallback, useEffect } from "react";
import PageTitle from "@/components/ui/PageTitle";
import PostCard from "@/components/Post/PostCard";
import { Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useSearchParams, useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const getFiltersFromURL = () => {
    return {
      Title: searchParams.get("Title") || "",
      Content: searchParams.get("Content") || "",
      Username: searchParams.get("Username") || "",
      StartTime: searchParams.get("StartTime") || "",
      EndTime: searchParams.get("EndTime") || "",
      ConfessionsOnly: searchParams.get("ConfessionsOnly") === "true",
    };
  };

  const [page, setPage] = useState<number>(1);
  const [filterPopUp, setFilterPopUp] = useState(false);
  const [filters, setFilters] = useState(getFiltersFromURL);

  const { posts, loading, hasMore, setPosts } = usePosts(page, filters);

  const { ref, inView } = useInView({
    threshold: 1.0,
  });

  useEffect(() => {
    if (inView && hasMore && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView, hasMore, loading]);

  useEffect(() => {
    const params = new URLSearchParams();

    if (filters.Title) params.set("Title", filters.Title);
    if (filters.Content) params.set("Content", filters.Content);
    if (filters.Username) params.set("Username", filters.Username);
    if (filters.StartTime) params.set("StartTime", filters.StartTime);
    if (filters.EndTime) params.set("EndTime", filters.EndTime);
    if (filters.ConfessionsOnly)
      params.set("ConfessionsOnly", filters.ConfessionsOnly.toString());

    router.replace(`?${params.toString()}`);
  }, [filters, router]);

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
    setPage(1);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleSubmit = () => {
    handleFilterChange(filters);
  };

  const resetFilters = () => {
    setFilters({
      Title: "",
      Content: "",
      Username: "",
      StartTime: "",
      EndTime: "",
      ConfessionsOnly: false,
    });
  };

  const handleDelete = (postId: string) => {
    setPosts([...posts.filter((post) => post.id !== postId)]);
  };
  return (
    <div className="max-w-[1000px] mx-auto flex flex-col gap-4">
      <PageTitle title="Forums" />
      <span
        className={`fixed md:hidden top-6 right-10`}
        onClick={() => setFilterPopUp((prev) => !prev)}
      >
        <Filter />
      </span>
      <span
        className={` md:hidden ${
          filterPopUp ? "fixed" : "hidden"
        } inset-0 bg-black/20 backdrop-blur-sm h-screen w-full`}
        onClick={() => setFilterPopUp((prev) => !prev)}
      />
      <div className="flex flex-row-reverse gap-6">
        <div
          className={`flex flex-col gap-6 p-4 border rounded-md h-fit fixed md:sticky top-20 md:top-10 bg-background transition-all ${
            filterPopUp ? "right-[5%]" : " right-[-100%]"
          } `}
        >
          <h1 className="text-2xl font-semibold">Filter</h1>
          <div className="grid grid-cols-1 gap-2">
            <label htmlFor="Title">Title</label>
            <Input
              id="Title"
              type="text"
              name="Title"
              placeholder="Title"
              value={filters.Title}
              onChange={handleChange}
            />
          </div>
          <div className="">
            <label htmlFor="Content">Content</label>
            <Input
              id="Content"
              type="text"
              name="Content"
              placeholder="Content"
              value={filters.Content}
              onChange={handleChange}
              className="p-2 border rounded"
            />
          </div>
          <div className="">
            <label htmlFor="Username">Username</label>
            <Input
              id="Username"
              type="text"
              name="Username"
              placeholder="Username"
              value={filters.Username}
              onChange={handleChange}
              className="p-2 border rounded"
            />
          </div>
          <div className="">
            <label htmlFor="StartTime">Start Time</label>
            <Input
              id="StartTime"
              type="datetime-local"
              name="StartTime"
              value={filters.StartTime}
              onChange={handleChange}
              className="p-2 border rounded"
            />
          </div>
          <div className="">
            <label htmlFor="EndTime">End Time</label>
            <Input
              id="EndTime"
              type="datetime-local"
              name="EndTime"
              value={filters.EndTime}
              onChange={handleChange}
              className="p-2 border rounded"
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="ConfessionsOnly"
              checked={filters.ConfessionsOnly}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="ConfessionsOnly">Confessions Only</label>
          </div>
          <button
            className="mt-4 p-2 bg-blue-500 text-white rounded"
            onClick={handleSubmit}
          >
            Apply Filters
          </button>
          <button
            className="mt-4 p-2 bg-red-500 text-white rounded"
            onClick={resetFilters}
          >
            Reset Filters
          </button>
        </div>
        <div className="flex-1 flex flex-col gap-4">
          {posts.map((post, index) => (
            <PostCard key={post.id} post={post} onDelete={handleDelete} />
          ))}
          {posts.length == 0 && !loading && <p>No Posts Found</p>}

          {loading && (
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
      </div>
      <div ref={ref} />
    </div>
  );
}
