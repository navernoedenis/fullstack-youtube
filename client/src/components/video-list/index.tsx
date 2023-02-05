import React from "react";
import { useTranslation } from "react-i18next";

import CustomTitle from "components/custom-title";
import VideoLink from "components/video-link";
import VideoLinkSkeleton from "components/video-link/skeleton";

import VideoGrid from "layouts/video-grid";

import { Video } from "types/video";
import { VideoListContainer } from "./styles";

interface VideoListProps {
  isLoading: boolean;
  videos: Video[];
}

function VideoList({ isLoading, videos }: VideoListProps) {
  const { t } = useTranslation("translation", {
    keyPrefix: "components.video-list",
  });

  if (isLoading) {
    return (
      <VideoListContainer>
        <VideoGrid>
          {[1, 2, 3, 4].map((key) => (
            <VideoLinkSkeleton key={key} />
          ))}
        </VideoGrid>
      </VideoListContainer>
    );
  }

  return (
    <VideoListContainer>
      {!videos.length && (
        <CustomTitle align="center">{t("no-videos")}</CustomTitle>
      )}

      <VideoGrid>
        {videos.map((video) => (
          <VideoLink key={video.id} video={video} />
        ))}
      </VideoGrid>
    </VideoListContainer>
  );
}

export default VideoList;
