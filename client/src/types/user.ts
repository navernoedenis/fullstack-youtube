export interface User {
  id: string;
  createdAt: Date;
  roles: Role[];
  email: string;
  profile: Profile;
  statistic: UserStatistic;
}

export interface UserStatistic {
  channelViews: number;
  isSubscribed: boolean;
  subscribers: number;
}

export type Role = "User" | "Admin" | "Root";

export interface Profile {
  id: string;
  username: string;
  avatar: string | null;
  bio: string | null;
  cover: string | null;
}
