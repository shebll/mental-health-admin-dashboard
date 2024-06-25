import React, { useState } from "react";
import Image from "next/image";
import { useReplies } from "@/hooks/useComments";
import { CommentType } from "@/types/Posts";
import Reply from "./Reply";
import { timeAgo } from "@/lib/timeAgoFunction";
import { Trash } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { deleteCommentById } from "@/lib/api";

interface CommentProps {
  comment: CommentType;
  postId: string;
}

const Comment: React.FC<CommentProps> = ({ comment, postId }) => {
  const { token } = useAuth();
  const { replies, loading } = useReplies(postId, comment.id);
  const [showReplies, setShowReplies] = useState<boolean>(false);

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
          <div
            onClick={() =>
              token && deleteCommentById(token, postId, comment.id.toString())
            }
            className=""
          >
            <Trash />
          </div>
        </div>
        <p className="ml-10">{comment.content}</p>
      </div>
      <div className="ml-10">
        {comment.repliesCount > 0 && (
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
