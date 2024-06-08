import { CommentType, ReplyType } from "@/types/Posts";
import { useState, useEffect } from "react";

export const useComments = (postId: number) => {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    fetch(`https://nexus-api-h3ik.onrender.com/api/posts/${postId}/comments`)
      .then((res) => res.json())
      .then((data: CommentType[]) => {
        setComments(data);
        setLoading(false);
      });
  }, [postId]);

  return { comments, loading };
};

export const useReplies = (postId: number, commentId: number) => {
  const [replies, setReplies] = useState<ReplyType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    fetch(
      `https://nexus-api-h3ik.onrender.com/api/posts/${postId}/comments/${commentId}/replies`
    )
      .then((res) => res.json())
      .then((data: ReplyType[]) => {
        setReplies(data);
        setLoading(false);
      });
  }, [postId, commentId]);

  return { replies, loading };
};
