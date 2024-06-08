// Reply.tsx
import { ReplyType } from "@/types/Posts";
import Image from "next/image";
import React from "react";

interface ReplyProps {
  reply: ReplyType;
}

const Reply: React.FC<ReplyProps> = ({ reply }) => {
  return (
    <div className="reply pl-8">
      <div className="flex items-center gap-2">
        {reply.photoUrl && (
          <Image
            width={40}
            height={40}
            src={reply.photoUrl}
            alt={reply.username}
            className="w-8 h-8 rounded-full"
          />
        )}
        <div>
          <p className="font-semibold">{reply.username}</p>
          <p>{reply.content}</p>
        </div>
      </div>
    </div>
  );
};

export default Reply;
