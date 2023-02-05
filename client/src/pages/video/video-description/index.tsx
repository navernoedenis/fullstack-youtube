import React from "react";
import DislikedIcon from "@mui/icons-material/ThumbDown";
import DislikeIcon from "@mui/icons-material/ThumbDownOutlined";
import LikedIcon from "@mui/icons-material/ThumbUp";
import LikeIcon from "@mui/icons-material/ThumbUpOutlined";

import { addVideoDislike, addVideoLike } from "api/video";
import { getDayMonthAndYear, getMonthName } from "helpers/date";
import { useAuth } from "context/auth";
import { Video } from "types/video";

import useVideoLikes from "hooks/useVideoLikes";

import {
  BottomSection,
  Button,
  ButtonIcon,
  Buttons,
  ButtonText,
  Title,
  VideoDescriptionContainer,
  ViewsAndDate,
} from "./styles";

interface VideoInfoProps {
  video: Video;
}

function VideoDescription({ video }: VideoInfoProps) {
  const { me } = useAuth();
  const { disLikes, isDisliked, isLiked, likes } = video.statistic;

  const mutation = useVideoLikes({
    disLikes,
    httpDislike: () => addVideoDislike(video.id),
    httpLike: () => addVideoLike(video.id),
    isDisliked,
    isLiked,
    likes,
    videoId: video.id,
  });

  const { day, year } = getDayMonthAndYear(video.createdAt);
  const month = getMonthName(video.createdAt);

  return (
    <VideoDescriptionContainer>
      <Title>{video.title}</Title>
      <BottomSection>
        <ViewsAndDate>
          {video.statistic.views} view {" • "}
          {month.slice(0, 3)} {day}, {year}
        </ViewsAndDate>

        <Buttons>
          <Button>
            <ButtonIcon onClick={mutation.onToggleLike} disabled={!me}>
              {mutation.isLiked ? <LikedIcon /> : <LikeIcon />}
            </ButtonIcon>
            <ButtonText>{mutation.likes}</ButtonText>
          </Button>

          <Button>
            <ButtonIcon onClick={mutation.onToggleDislike} disabled={!me}>
              {mutation.isDisliked ? <DislikedIcon /> : <DislikeIcon />}
            </ButtonIcon>
            <ButtonText>{mutation.disLikes}</ButtonText>
          </Button>
        </Buttons>
      </BottomSection>
    </VideoDescriptionContainer>
  );
}

export default VideoDescription;
