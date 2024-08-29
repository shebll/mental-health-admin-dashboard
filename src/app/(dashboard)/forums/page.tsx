"use client";

import PostsFeed from "@/components/Post/PostsFeed";
import PostsFilter from "@/components/Post/PostsFilter";
import { PostFiltersProvider } from "@/components/Post/usePostFilter";
import PageTitle from "@/components/ui/PageTitle";

const PostsPage = () => {
  return (
    <PostFiltersProvider>
      <div className=" mx-auto flex flex-col gap-4 max-w-[900px]">
        <PageTitle title="Forums" />
        <div className="flex gap-4 justify-center">
          <PostsFeed />
          <PostsFilter />
        </div>
      </div>
    </PostFiltersProvider>
  );
};

export default PostsPage;
