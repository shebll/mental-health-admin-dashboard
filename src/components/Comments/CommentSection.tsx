import { useComments } from "@/hooks/useComments";
import { Post } from "@/types/Posts";
import React, { useState } from "react";
import Comment from "./Comment";
interface CommentSectionProps {
  post: Post;
}

const CommentSection: React.FC<CommentSectionProps> = ({ post }) => {
  const { comments, loading, setComments } = useComments(post.id);
  const [showAllComments, setShowAllComments] = useState<boolean>(false);

  if (loading) {
    return <div>Loading comments...</div>;
  }

  const handleDelete = (commentId: string) => {
    console.log(
      comments.filter((comment) => comment.id.toString() !== commentId)
    );
    setComments([
      ...comments.filter((comment) => comment.id.toString() !== commentId),
    ]);
  };
  return (
    <div className="w-full flex flex-col gap-2">
      {comments
        .slice(0, showAllComments ? comments.length : 1)
        .map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            postId={post.id}
            onDelete={handleDelete}
          />
        ))}
      {comments.length == 0 && <p className="text-sm">No Comment </p>}
      {comments.length > 1 && (
        <button
          onClick={() => setShowAllComments(!showAllComments)}
          className="text-end w-full text-blue-500"
        >
          {showAllComments ? "Hide " : "See More"}
        </button>
      )}
    </div>
  );
};

export default CommentSection;
