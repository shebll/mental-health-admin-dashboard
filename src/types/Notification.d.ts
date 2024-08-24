export type NotificationType = {
  id: number;
  dateCreated: string;
  isRead: boolean;
  message: string;
  notifierPhotoUrl: string;
  notifierUserName: string;
  resources: {
    commentId: number;
    postId: number;
  };
  type: string;
};
