import client from "client";
import { User } from "types/user";

export const getUserByUsername = async (username: string) => {
  return client
    .get<User>(`/api/users/username/${username}`)
    .then((response) => response.data);
};

export const getUserSubscriptions = async (username: string) => {
  return client
    .get<User[]>(`/api/users/username/${username}/subscriptions`)
    .then((response) => response.data);
};

export const updateUser = async (id: string, payload: unknown) => {
  return client
    .put<User>(`/api/users/${id}`, payload)
    .then((response) => response.data);
};

export const deleteUser = async (id: string) => {
  return client.delete(`/api/users/${id}`);
};

export const subscribeAtUser = async (id: string) => {
  return client.post(`/api/users/${id}/subscribe`);
};
