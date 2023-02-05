import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getUserVideos } from "api/video";
import VideoList from "components/video-list";

import { UserVideosContainer } from "./styles";

interface UserVideosProps {
  username: string;
}

function UserVideos({ username }: UserVideosProps) {
  const { isLoading, data: videos = [] } = useQuery({
    queryKey: ["user-videos", username],
    queryFn: () => getUserVideos(username),
  });

  return (
    <UserVideosContainer>
      <VideoList isLoading={isLoading} videos={videos} />
    </UserVideosContainer>
  );
}

export default UserVideos;
