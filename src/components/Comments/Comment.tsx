import React, { useState } from "react";
import Image from "next/image";
import { useReplies } from "@/hooks/useComments";
import { CommentType } from "@/types/Posts";
import Reply from "./Reply";
import { timeAgo } from "@/lib/timeAgoFunction";
import { Trash } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { deleteCommentById } from "@/lib/api";
import { toast } from "sonner";

interface CommentProps {
  comment: CommentType;
  postId: string;
  onDelete: (postId: string) => void;
}

const Comment: React.FC<CommentProps> = ({ comment, postId, onDelete }) => {
  const { token } = useAuth();
  const { replies, loading, setReplies } = useReplies(postId, comment.id);
  const [showReplies, setShowReplies] = useState<boolean>(false);

  const handleDelete = async () => {
    if (token) {
      const response = await deleteCommentById(
        token,
        postId,
        comment.id.toString()
      );
      if (response) {
        toast.success("Comment Deleted Successfully");
        onDelete(comment.id.toString());
      } else {
        toast.error("Failed To Delete Comment");
      }
    }
  };

  const handleDeleteReply = (ReplyId: string) => {
    console.log(replies.filter((reply) => reply.id.toString() !== ReplyId));
    setReplies([...replies.filter((reply) => reply.id.toString() !== ReplyId)]);
  };
  return (
    <div className="comment">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <div className="flex items-center gap-1">
            {comment.photoUrl && (
              <Image
                width={40}
                height={40}
                src={comment.photoUrl}
                alt={comment.username}
                className="w-10 h-10 rounded-full"
              />
            )}
            <div className="flex flex-col ">
              <p className="font-semibold">{comment.username}</p>
              <p className="text-sm text-primary/70">
                {timeAgo(comment.commentedAt)}
              </p>
            </div>
          </div>
          <div onClick={handleDelete} className="cursor-pointer">
            <Trash />
          </div>
        </div>
        <p className="ml-10">{comment.content}</p>
      </div>
      <div className="ml-10">
        {replies.length > 0 && (
          <button
            onClick={() => setShowReplies(!showReplies)}
            className=" text-gray-500"
          >
            {showReplies ? "Hide" : "Show"} Replies
          </button>
        )}
        {showReplies && (
          <div className="replies">
            {loading ? (
              <div>Loading replies...</div>
            ) : (
              replies.map((reply) => (
                <Reply
                  key={reply.id}
                  reply={reply}
                  postId={postId}
                  commentId={comment.id.toString()}
                  onDelete={handleDeleteReply}
                />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
