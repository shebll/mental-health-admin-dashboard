"use client";

import PostsFeed from "@/components/Post/PostsFeed";
import PostsFilter from "@/components/Post/PostsFilter";
import { PostFiltersProvider } from "@/components/Post/usePostFilter";
import PageTitle from "@/components/ui/PageTitle";

const PostsPage = () => {
  return (
    <PostFiltersProvider>
      <div className="max-w-[1200px] mx-auto flex flex-col gap-4">
        <PageTitle title="Forums" />
        <div className="flex gap-4">
          <PostsFeed />
          <PostsFilter />
        </div>
      </div>
    </PostFiltersProvider>
  );
};

export default PostsPage;
