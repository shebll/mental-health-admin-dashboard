"use client";
import { useAuth } from "@/context/AuthContext";
import { Post } from "@/types/Posts";
import { useState, useEffect } from "react";

const usePosts = (page: any, query: any, isConfusionFilter: any) => {
  const { token } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<any>(true);
  const [hasMore, setHasMore] = useState<any>(true);
  const pageSize = 20;
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
        setHasMore(data.length === pageSize);
        setLoading(false);
      });
  }, [page, query, isConfusionFilter, token]);

  return { posts, loading, hasMore, setPosts };
};

export default usePosts;
