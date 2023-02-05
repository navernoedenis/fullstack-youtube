import axios from "axios";
import { replaceUrlFileExtension } from "helpers/file";
import { ImageResponse, VideoResponse } from "types/cloudinary";

const {
  REACT_APP_CLOUDINARY_API_URL = "",
  REACT_APP_CLOUDINARY_NAME = "",
  REACT_APP_CLOUDINARY_PRESET_IMAGES = "",
  REACT_APP_CLOUDINARY_PRESET_VIDEOS = "",
} = process.env;

const cloudinaryApi = axios.create({
  baseURL: REACT_APP_CLOUDINARY_API_URL,
});

type UploadFile = "image" | "video";

const presets: Record<UploadFile, string> = {
  image: REACT_APP_CLOUDINARY_PRESET_IMAGES,
  video: REACT_APP_CLOUDINARY_PRESET_VIDEOS,
};

const createFormData = (file: File, type: UploadFile) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", presets[type]);
  return formData;
};

export const uploadImageFile = async (file: File) => {
  const formData = createFormData(file, "image");

  const { data } = await cloudinaryApi.post<ImageResponse>(
    `/${REACT_APP_CLOUDINARY_NAME}/image/upload`,
    formData
  );

  return {
    url: data.secure_url,
  };
};

export const uploadVideoFile = async (file: File) => {
  const formData = createFormData(file, "video");

  const { data } = await cloudinaryApi.post<VideoResponse>(
    `/${REACT_APP_CLOUDINARY_NAME}/video/upload`,
    formData
  );

  return {
    url: data.secure_url,
    thumbnail: replaceUrlFileExtension(data.secure_url, "jpg"),
  };
};
