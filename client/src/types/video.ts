import { User } from "./user";

export interface Video {
  id: string;
  createdAt: Date;
  title: string;
  description: string | null;
  url: string;
  thumbnail: string;
  user: User;
  comments: VideoComment[];
  statistic: {
    isDisliked: boolean;
    isLiked: boolean;
    isMyVideo: boolean;
    isViewed: boolean;
    comments: number;
    disLikes: number;
    likes: number;
    views: number;
  };
}

export interface VideoComment {
  id: string;
  createdAt: Date;
  message: string;
  videoId: string;
  user: User;
  statistic: {
    isLiked: boolean;
    isDisliked: boolean;
    likes: number;
    disLikes: number;
  };
}

export interface CreateVideoData {
  title: string;
  url: string;
  thumbnail: string;
  description?: string;
}
