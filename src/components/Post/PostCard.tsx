import { Post } from "@/types/Posts";
import Image from "next/image";
import { Trash, User } from "lucide-react";
import CommentSection from "../Comments/CommentSection";
import { timeAgo } from "@/lib/timeAgoFunction";
import { useAuth } from "@/context/AuthContext";
import { deletePostById } from "@/lib/api";
import { toast } from "sonner";

interface PostCardProps {
  post: Post;
  onDelete: (postId: string) => void;
}

const PostCard = ({ post, onDelete }: PostCardProps) => {
  const { token } = useAuth();

  const handleDelete = async () => {
    if (token) {
      const response = await deletePostById(token, post.id);
      if (response) {
        toast.success("Post Deleted Successfully");
        onDelete(post.id);
      } else {
        toast.error("Failed to delete post");
      }
    }
  };

  return (
    <div className="flex flex-col gap-2 border p-4 rounded-md">
      <div className="px-6 py-8 bg-primary-foreground shadow-md rounded-lg flex gap-2 flex-col">
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            {post.photoUrl ? (
              <Image
                width={40}
                height={40}
                src={post.photoUrl}
                alt="User"
                className="w-10 h-10 rounded-full mr-2"
              />
            ) : (
              <User size={40} className="bg-background p-1 rounded-full" />
            )}

            <div className="flex flex-col ">
              <h2 className="text-lg font-semibold">
                {post.username ? post.username : "Anonymous"}
              </h2>
              <p className="text-sm text-primary/70">
                {timeAgo(post.postedOn)}
              </p>
            </div>
          </div>
          <div onClick={handleDelete} className="cursor-pointer">
            <Trash />
          </div>
        </div>
        {post.postPhotoUrl && (
          <Image
            width={240}
            height={100}
            src={post.postPhotoUrl}
            alt="Post"
            className="w-full h-48 object-cover mb-2 rounded"
          />
        )}
        <h2 className="text-lg font-semibold">{post.title}</h2>
        <p className=" text-secondary-foreground">{post.content}</p>
        <div className="text-end">
          <span>{post.commentsCount} Comments</span>
        </div>
      </div>
      <div className="px-6 py-2 min-h-8 bg-primary-foreground shadow-md rounded-lg flex gap-2 flex-col">
        <CommentSection post={post} />
      </div>
    </div>
  );
};

export default PostCard;
