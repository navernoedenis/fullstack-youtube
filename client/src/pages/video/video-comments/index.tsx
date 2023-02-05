import React from "react";
import { VideoComment as Comment } from "types/video";
import VideoComment from "./video-comment";
import { VideoCommentsContainer, Comments } from "./styles";

interface VideoCommentsProps {
  comments: Comment[];
}

function VideoComments({ comments }: VideoCommentsProps) {
  return (
    <VideoCommentsContainer>
      <Comments>
        {comments.map((comment) => (
          <VideoComment key={comment.id} comment={comment} />
        ))}
      </Comments>
    </VideoCommentsContainer>
  );
}

export default VideoComments;
