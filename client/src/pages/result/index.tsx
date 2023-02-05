import React, { useEffect } from "react";
import { useSearchParams, Navigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import { getSearchVideos } from "api/video";
import VideoList from "components/video-list";

function ResultPage() {
  const [params] = useSearchParams();
  const searchQuery = params.get("search");

  const {
    isLoading,
    mutate: searchVideoMutate,
    data: videos = [],
  } = useMutation({
    mutationFn: () => getSearchVideos(searchQuery as string),
  });

  useEffect(() => {
    if (!searchQuery) return;
    searchVideoMutate();
  }, [searchQuery, searchVideoMutate]);

  if (!searchQuery) {
    return <Navigate to="/" replace />;
  }

  return <VideoList isLoading={isLoading} videos={videos} />;
}

export default ResultPage;
