import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UseLikesProps {
  disLikes: number;
  httpDislike: () => Promise<unknown>;
  httpLike: () => Promise<unknown>;
  isDisliked: boolean;
  isLiked: boolean;
  likes: number;
  videoId: string;
}

function useVideoLikes(payload: UseLikesProps) {
  const queryClient = useQueryClient();

  const [isDisliked, setDisliked] = useState(payload.isDisliked);
  const [isLiked, setLiked] = useState(payload.isLiked);

  const [disLikes, setDislikes] = useState(payload.disLikes);
  const [likes, setLikes] = useState(payload.likes);

  const { mutate: dislikeMutate } = useMutation(payload.httpDislike, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["video", payload.videoId] });
    },
  });

  const { mutate: likeMutate } = useMutation(payload.httpLike, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["video", payload.videoId] });
    },
  });

  const onToggleDislike = () => {
    dislikeMutate();

    if (isDisliked) {
      setDisliked(false);
      setDislikes((prev) => prev - 1);
    } else {
      setDisliked(true);
      setDislikes((prev) => prev + 1);
    }

    if (isLiked) {
      setLiked(false);
      setLikes((prev) => prev - 1);
    }
  };

  const onToggleLike = () => {
    likeMutate();

    if (isLiked) {
      setLiked(false);
      setLikes((prev) => prev - 1);
    } else {
      setLiked(true);
      setLikes((prev) => prev + 1);
    }

    if (isDisliked) {
      setDisliked(false);
      setDislikes((prev) => prev - 1);
    }
  };

  return {
    disLikes,
    isDisliked,
    isLiked,
    likes,
    onToggleDislike,
    onToggleLike,
  };
}

export default useVideoLikes;
