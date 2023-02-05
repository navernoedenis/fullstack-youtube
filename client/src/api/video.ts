import client from "client";
import { CreateVideoData, Video, VideoComment } from "types/video";

export const uploadVideo = async (data: CreateVideoData) => {
  return client
    .post<Video>("/api/videos", data)
    .then((response) => response.data);
};

export const getAllVideos = async () => {
  return client
    .get<Video[]>("/api/videos/all")
    .then((response) => response.data);
};

export const getLastVideos = async () => {
  return client
    .get<Video[]>("/api/videos/last")
    .then((response) => response.data);
};

export const getUserVideos = async (username: string) => {
  return client
    .get<Video[]>(`/api/videos/all/${username}`)
    .then((response) => response.data);
};

export const getSubscriptionsVideos = async () => {
  return client
    .get<Video[]>(`/api/videos/subscriptions`)
    .then((response) => response.data);
};

export const getLikedVideos = async () => {
  return client
    .get<Video[]>(`/api/videos/likes`)
    .then((response) => response.data);
};

export const getSearchVideos = async (query: string) => {
  return client
    .get<Video[]>(`/api/videos/search?query=${query}`)
    .then((response) => response.data);
};

export const getRecommendation = async () => {
  return client
    .get<Video[]>("/api/videos/recommendations")
    .then((response) => response.data);
};

export const getVideo = async (id: string) => {
  return client
    .get<Video>(`/api/videos/${id}`)
    .then((response) => response.data);
};

export const deleteVideo = async (id: string) => {
  return client.delete(`/api/videos/${id}`);
};

export const addVideoView = async (id: string) => {
  return client.post(`/api/videos/${id}/view`);
};

export const addVideoLike = async (id: string) => {
  return client.post(`/api/videos/${id}/like`);
};

export const addVideoDislike = async (id: string) => {
  return client.post(`/api/videos/${id}/dislike`);
};

export const addVideoComment = async (
  id: string,
  form: Pick<VideoComment, "message">
) => {
  return client
    .post<VideoComment>(`/api/videos/${id}/comments`, form)
    .then((response) => response.data);
};

export const deleteVideoComment = async (
  videoId: string,
  commentId: string
) => {
  return client.delete(`/api/videos/${videoId}/comments/${commentId}`);
};

export const addVideoCommentLike = async (
  videoId: string,
  commentId: string
) => {
  return client.post(`/api/videos/${videoId}/comments/${commentId}/like`);
};

export const addVideoCommentDislike = async (
  videoId: string,
  commentId: string
) => {
  return client.post(`/api/videos/${videoId}/comments/${commentId}/dislike`);
};
