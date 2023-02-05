import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getUserVideos } from "api/video";

import { useAuth } from "context/auth";
import VideoList from "components/video-list";

function MyVideosPage() {
  const { me } = useAuth();
  const { isLoading, data: videos = [] } = useQuery({
    queryKey: ["my-videos"],
    queryFn: () => getUserVideos(me?.profile.username as string),
  });

  return <VideoList isLoading={isLoading} videos={videos} />;
}

export default MyVideosPage;
