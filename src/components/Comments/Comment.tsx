// Comment.tsx
import React, { useState } from "react";
import Image from "next/image";
import { useReplies } from "@/hooks/useComments";
import { CommentType } from "@/types/Posts";
import Reply from "./Reply";
import { Button } from "../ui/button";

interface CommentProps {
  comment: CommentType;
  postId: number;
}

const Comment: React.FC<CommentProps> = ({ comment, postId }) => {
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

            <p className="font-semibold">{comment.username}</p>
          </div>
          <Button size={"sm"} variant={"destructive"} className="text-end">
            Delete Comment
          </Button>
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
              replies.map((reply) => <Reply key={reply.id} reply={reply} />)
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
