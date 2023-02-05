import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getSubscriptionsVideos } from "api/video";

import VideoList from "components/video-list";

function MySubscriptionsPage() {
  const { isLoading, data: videos = [] } = useQuery({
    queryKey: ["subscriptions-videos"],
    queryFn: getSubscriptionsVideos,
  });

  return <VideoList isLoading={isLoading} videos={videos} />;
}

export default MySubscriptionsPage;
