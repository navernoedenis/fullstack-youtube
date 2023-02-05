import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import Pagination from "@mui/material/Pagination";

import { getAllVideos } from "api/video";

import CustomTitle from "components/custom-title";
import VideoItem from "./video-item";

import { AllVideosContainer, VideoList } from "./styles";

function AllVideosPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const { t } = useTranslation("translation", {
    keyPrefix: "pages.admin.all-videos",
  });

  const { isLoading, data: videos = [] } = useQuery({
    queryKey: ["all-videos"],
    queryFn: getAllVideos,
  });

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;

  return (
    <AllVideosContainer>
      <CustomTitle>
        {t("amount")}: {videos.length}
      </CustomTitle>

      <VideoList>
        {videos.slice(firstIndex, lastIndex).map((video) => (
          <VideoItem key={video.id} video={video} />
        ))}
      </VideoList>

      <Pagination
        count={Math.ceil(videos.length / itemsPerPage)}
        defaultPage={currentPage}
        onChange={(_, page) => setCurrentPage(page)}
        page={currentPage}
        size="large"
      />
    </AllVideosContainer>
  );
}

export default AllVideosPage;
