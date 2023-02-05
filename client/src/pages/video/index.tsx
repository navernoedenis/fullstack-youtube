import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { useAuth } from "context/auth";
import { getVideo } from "api/video";

import AddComment from "./add-comment";
import VideoAuthor from "./video-author";
import VideoComments from "./video-comments";
import VideoDescription from "./video-description";
import VideoPlayer from "./video-player";
import VideoRecommendations from "./video-recommendations";

import {
  Main,
  VideoPageContainer,
  VideoPlayerContainer,
  VideoRecommendationsContainer,
} from "./styles";

function VideoPage() {
  const { me } = useAuth();
  const { videoId } = useParams<{ videoId: string }>();

  const { isLoading, data: video } = useQuery({
    queryKey: ["video", videoId],
    queryFn: () => getVideo(videoId as string),
  });

  if (isLoading) {
    return <h2>Loading....</h2>;
  }

  if (!video) {
    return <h2>Something went wrong... Incorrect video Id</h2>;
  }

  return (
    <VideoPageContainer>
      <Main>
        <VideoPlayerContainer>
          <VideoPlayer videoId={video.id} videoUrl={video.url} />
        </VideoPlayerContainer>

        <VideoDescription video={video} />
        <VideoAuthor author={video.user} />
        <AddComment videoId={video.id} />
        <VideoComments comments={video.comments} />
      </Main>

      <VideoRecommendationsContainer>
        {me && <VideoRecommendations />}
      </VideoRecommendationsContainer>
    </VideoPageContainer>
  );
}

export default VideoPage;
