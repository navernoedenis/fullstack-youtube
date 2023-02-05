import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getLastVideos } from "api/video";

import VideoList from "components/video-list";

function HomePage() {
  const { isLoading, data: videos = [] } = useQuery({
    queryKey: ["home-videos"],
    queryFn: getLastVideos,
  });

  return <VideoList isLoading={isLoading} videos={videos} />;
}

export default HomePage;
