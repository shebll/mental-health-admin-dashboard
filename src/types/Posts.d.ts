// Post type data 
export type Post = {
  appUserId: string;
  commentsCount: number;
  content: string;
  id: number;
  isAnonymous: boolean;
  photoUrl: string | null;
  postPhotoUrl: string | null;
  postedOn: string;
  title: string;
  username: string;
}
