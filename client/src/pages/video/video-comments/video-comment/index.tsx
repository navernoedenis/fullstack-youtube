import React from "react";

import DislikedIcon from "@mui/icons-material/ThumbDown";
import DislikeIcon from "@mui/icons-material/ThumbDownOutlined";
import LikedIcon from "@mui/icons-material/ThumbUp";
import LikeIcon from "@mui/icons-material/ThumbUpOutlined";

import UploadedTime from "components/uploaded-time";

import { addVideoCommentDislike, addVideoCommentLike } from "api/video";
import { VideoComment as Comment } from "types/video";

import useVideoLikes from "hooks/useVideoLikes";

import {
  Avatar,
  Button,
  ButtonContainer,
  Footer,
  ButtonText,
  Header,
  CreatedAt,
  Main,
  Message,
  Username,
  VideoCommentContainer,
} from "./styles";

interface VideoCommentProps {
  comment: Comment;
}

function VideoComment({ comment }: VideoCommentProps) {
  const { id, videoId, user } = comment;
  const { disLikes, isDisliked, isLiked, likes } = comment.statistic;

  const mutation = useVideoLikes({
    disLikes,
    httpDislike: () => addVideoCommentDislike(videoId, id),
    httpLike: () => addVideoCommentLike(videoId, id),
    isDisliked,
    isLiked,
    likes,
    videoId,
  });

  return (
    <VideoCommentContainer>
      <Avatar src={user.profile.avatar || ""} />
      <Main>
        <Header component="header">
          <Username to={`/user/${user.profile.username}`}>
            {user.profile.username}
          </Username>

          <CreatedAt>
            <UploadedTime date={comment.createdAt} />
          </CreatedAt>
        </Header>

        <Message>{comment.message}</Message>

        <Footer component="footer">
          <ButtonContainer>
            <Button onClick={mutation.onToggleLike}>
              {mutation.isLiked ? <LikedIcon /> : <LikeIcon />}
            </Button>
            <ButtonText>{mutation.likes}</ButtonText>
          </ButtonContainer>

          <ButtonContainer>
            <Button onClick={mutation.onToggleDislike}>
              {mutation.isDisliked ? <DislikedIcon /> : <DislikeIcon />}
            </Button>
            <ButtonText>{mutation.disLikes}</ButtonText>
          </ButtonContainer>
        </Footer>
      </Main>
    </VideoCommentContainer>
  );
}

export default VideoComment;
