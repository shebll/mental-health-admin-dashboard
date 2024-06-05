import { Post } from "@/types/Posts";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  return (
    <Link
      href={`/forums/${post.id}`}
      className="px-6 py-8 bg-primary-foreground shadow-md rounded-lg mb-4 flex gap-2 flex-col"
    >
      <Link href={`/users/${post.appUserId}`} className="flex justify-between">
        <div className="flex items-center gap-2">
          <Image
            width={40}
            height={40}
            src={post.photoUrl || ""}
            alt="User"
            className="w-10 h-10 rounded-full mr-2"
          />
          <h2 className="text-lg font-semibold">{post.username}</h2>
        </div>
        <Button size={"sm"} variant={"destructive"}>
          Delete Post
        </Button>
      </Link>
      {post.postPhotoUrl && (
        <Image
          width={140}
          height={40}
          src={post.postPhotoUrl}
          alt="Post"
          className="w-full h-48 object-cover mb-2 rounded"
        />
      )}
      <h2 className="text-lg font-semibold">{post.title}</h2>
      <p className="text-primary">{post.content}</p>
      <div className="text-end">
        <span>{post.commentsCount} Comments</span>
      </div>
    </Link>
  );
};

export default PostCard;
