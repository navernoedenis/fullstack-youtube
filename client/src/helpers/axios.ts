import { AxiosError } from "axios";

interface AxiosErrorResponse {
  statusCode: number;
  message: string | string[];
  error?: string;
}

export function getAxiosErrorResponse(error: AxiosError) {
  return error.response?.data as AxiosErrorResponse;
}

export function getAxiosErrorMessage(error: AxiosError) {
  const { message } = error.response?.data as AxiosErrorResponse;
  return Array.isArray(message) ? message[0] : message;
}
