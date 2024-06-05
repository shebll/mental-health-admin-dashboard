"use client";
import { useAuth } from "@/providers/AuthContext";
import { Post } from "@/types/Posts";
import { useState, useEffect } from "react";

const usePosts = (page: any, query: any, isConfusionFilter: any) => {
  const { token } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<any>(true);
  const [hasMore, setHasMore] = useState<any>(true);
  const pageSize = 5;
  console.log(page);
  console.log(hasMore);
  useEffect(() => {
    setLoading(true);
    fetch(
      `https://nexus-api-h3ik.onrender.com/api/posts?PageNumber=${page}&PageSize=${pageSize}`,
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
        console.log(data);
        setPosts((prevPosts: any) => [...prevPosts, ...data]);
        setHasMore(data.length === 5);
        setLoading(false);
      });
  }, [page, query, isConfusionFilter, token]);

  return { posts, loading, hasMore };
};

export default usePosts;
