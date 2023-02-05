export interface ImageResponse {
  access_mode: string;
  asset_id: string;
  bytes: number;
  created_at: Date;
  etag: string;
  folder: string;
  format: string;
  height: number;
  original_filename: string;
  placeholder: boolean;
  public_id: string;
  resource_type: string;
  secure_url: string;
  signature: string;
  tags: string[];
  type: string;
  url: string;
  version_id: string;
  version: number;
  width: number;
}

export interface VideoResponse extends ImageResponse {
  bit_rate: number;
  duration: number;
  frame_rate: number;
  nb_frames: number;
  pages: number;
  rotation: number;
  video: {
    bit_rate: string;
    codec: string;
    level: number;
    pix_format: string;
    profile: string;
    time_base: string;
  };
}
