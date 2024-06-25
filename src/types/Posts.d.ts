// Post type data
export type Post = {
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
export interface CommentType {
  id: number;
  content: string;
  commentedAt: string;
  username: string;
  appUserId: string;
  photoUrl: string | null;
  repliesCount: number;
}

export interface ReplyType {
  id: number;
  content: string;
  repliedAt: string;
  username: string;
  appUserId: string;
  photoUrl: string | null;
}
