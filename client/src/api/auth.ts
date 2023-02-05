import client from "client";

import { uploadImageFile } from "api/upload";
import { User } from "types/user";
import { LoginForm, RegisterForm } from "types/forms";

const baseURL = process.env.REACT_APP_API_URL as string;

export const onLogin = async (form: LoginForm) => {
  return client.post<{ accessToken: string; user: User }>(
    `${baseURL}/auth/login`,
    form
  );
};

export const onRegister = async (form: RegisterForm, image: File | null) => {
  let avatarUrl = "";

  if (image) {
    const { url } = await uploadImageFile(image);
    avatarUrl = url;
  }

  const { bio, ...otherProps } = form;

  const { data } = await client.post<User>(`${baseURL}/auth/register`, {
    ...otherProps,
    ...(bio?.trim() && { bio }),
    ...(avatarUrl && { avatar: avatarUrl }),
  });

  return data;
};

export const onVerifyAccessToken = async (token: string) => {
  const { data } = await client.get<User>(`${baseURL}/auth/token/access`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};
