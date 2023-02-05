import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

import CustomTitle from "components/custom-title";
import VideoLink from "components/video-link";
import VideoLinkSkeleton from "components/video-link/skeleton";

import { getRecommendation } from "api/video";
import { VideoRecommendationsContainer } from "./styles";

function VideoRecommendations() {
  const { t } = useTranslation("translation", {
    keyPrefix: "pages.video.video-recommendations",
  });

  const { isLoading, data: videos = [] } = useQuery({
    queryKey: ["my-recommendations"],
    queryFn: getRecommendation,
  });

  if (isLoading) {
    return (
      <VideoRecommendationsContainer>
        {[1, 2, 3].map((key) => (
          <VideoLinkSkeleton key={key} />
        ))}
      </VideoRecommendationsContainer>
    );
  }

  return (
    <VideoRecommendationsContainer>
      {!videos.length && <CustomTitle>{t("no-recommendations")}</CustomTitle>}

      {videos.map((video) => (
        <VideoLink key={video.id} video={video} />
      ))}
    </VideoRecommendationsContainer>
  );
}

export default VideoRecommendations;
