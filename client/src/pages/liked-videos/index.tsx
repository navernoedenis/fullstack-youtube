import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getLikedVideos } from "api/video";

import VideoList from "components/video-list";

function LikedVideosPage() {
  const { isLoading, data: videos = [] } = useQuery({
    queryKey: ["liked-videos"],
    queryFn: getLikedVideos,
  });

  return <VideoList isLoading={isLoading} videos={videos} />;
}

export default LikedVideosPage;
