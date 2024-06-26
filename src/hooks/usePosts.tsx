"use client";
import { useAuth } from "@/context/AuthContext";
import { Post } from "@/types/Posts";
import { useState, useEffect } from "react";

const usePosts = (page: any, filters: any) => {
  const { token } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<any>(true);
  const [hasMore, setHasMore] = useState<any>(true);
  const pageSize = 20;

  useEffect(() => {
    setLoading(true);
    const queryParams = new URLSearchParams({
      PageNumber: page.toString(),
      PageSize: pageSize.toString(),
    });

    if (filters.Title) queryParams.set("Title", filters.Title);
    if (filters.Content) queryParams.set("Content", filters.Content);
    if (filters.Username) queryParams.set("Username", filters.Username);
    if (filters.StartTime) queryParams.set("StartTime", filters.StartTime);
    if (filters.EndTime) queryParams.set("EndTime", filters.EndTime);
    if (filters.ConfessionsOnly)
      queryParams.set("ConfessionsOnly", filters.ConfessionsOnly.toString());

    fetch(
      `https://nexus-api-h3ik.onrender.com/api/posts?${queryParams.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setPosts((prevPosts: any) =>
          page === 1 ? data : [...prevPosts, ...data]
        );
        setHasMore(data.length === pageSize);
        setLoading(false);
      });
  }, [page, filters, token]);

  return { posts, loading, hasMore, setPosts };
};

export default usePosts;
