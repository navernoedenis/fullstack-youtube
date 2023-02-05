export type LoginForm = {
  email: string;
  password: string;
};

export type RegisterForm = LoginForm & {
  username: string;
  bio?: string;
};

export type VideoDescriptionForm = {
  title: string;
  description?: string;
};

export type AddVideoCommentForm = {
  message: string;
};
