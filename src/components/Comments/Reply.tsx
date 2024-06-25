import { useAuth } from "@/context/AuthContext";
import { deleteReplyById } from "@/lib/api";
import { ReplyType } from "@/types/Posts";
import { Trash } from "lucide-react";
import Image from "next/image";
import React from "react";
import { toast } from "sonner";

interface ReplyProps {
  reply: ReplyType;
  commentId: string;
  postId: string;
  onDelete: (postId: string) => void;
}

const Reply: React.FC<ReplyProps> = ({
  reply,
  commentId,
  postId,
  onDelete,
}) => {
  const { token } = useAuth();

  const handleDelete = async () => {
    if (token) {
      const response = await deleteReplyById(
        token,
        reply.id.toString(),
        commentId,
        postId
      );
      if (response) {
        toast.success("reply Deleted Successfully");
        onDelete(reply.id.toString());
      } else {
        toast.error("Failed To Delete reply");
      }
    }
  };
  return (
    <div className="reply pl-8 flex justify-between">
      <div className="flex items-center gap-2">
        <div className="">
          {reply.photoUrl && (
            <Image
              width={40}
              height={40}
              src={reply.photoUrl}
              alt={reply.username}
              className="w-8 h-8 rounded-full"
            />
          )}
        </div>
        <div>
          <p className="font-semibold">{reply.username}</p>
          <p>{reply.content}</p>
        </div>
      </div>
      <div onClick={handleDelete} className="cursor-pointer max-w-sm">
        <Trash size={18} />
      </div>
    </div>
  );
};

export default Reply;
