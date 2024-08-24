type Post = {
  appUserId: string;
  commentsCount: number;
  content: string;
  id: string;
  isAnonymous: boolean;
  photoUrl: string | null;
  postPhotoUrl: string | null;
  postedOn: string;
  title: string;
  username: string;
};
interface CommentType {
  id: number;
  content: string;
  commentedAt: string;
  username: string;
  appUserId: string;
  photoUrl: string | null;
  repliesCount: number;
}

interface ReplyType {
  id: number;
  content: string;
  repliedAt: string;
  username: string;
  appUserId: string;
  photoUrl: string | null;
}
