import { useState, useEffect } from "react";

export const useComments = (postId: string) => {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    fetch(`https://nexus-api.runasp.net/api/posts/${postId}/comments`)
      .then((res) => res.json())
      .then((data: CommentType[]) => {
        setComments(data);
        setLoading(false);
      });
  }, [postId]);

  return { comments, loading, setComments };
};

export const useReplies = (postId: string, commentId: number) => {
  const [replies, setReplies] = useState<ReplyType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    fetch(
      `https://nexus-api.runasp.net/api/posts/${postId}/comments/${commentId}/replies`
    )
      .then((res) => res.json())
      .then((data: ReplyType[]) => {
        setReplies(data);
        setLoading(false);
      });
  }, [postId, commentId]);

  return { replies, loading, setReplies };
};
