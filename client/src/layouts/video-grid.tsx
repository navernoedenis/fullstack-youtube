import React, { ReactNode } from "react";
import styled from "@emotion/styled";
import MuiBox from "@mui/material/Box";

interface VideoGridProps {
  children: ReactNode;
}

const VideoGridContainer = styled(MuiBox)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-column-gap: 14px;
  grid-row-gap: 14px;

  .video-link-thumbnail {
    height: 8vw;
  }

  @media screen and (max-width: 1951px) {
    grid-template-columns: repeat(5, 1fr);

    .video-link-thumbnail {
      height: 10.5vw;
    }
  }

  @media screen and (max-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);

    .video-link-thumbnail {
      height: 14vw;
    }
  }

  @media screen and (max-width: 873px) {
    grid-template-columns: repeat(3, 1fr);

    .video-link-thumbnail {
      height: 18vw;
    }
  }

  @media screen and (max-width: 587px) {
    grid-template-columns: repeat(2, 1fr);

    .video-link-thumbnail {
      height: 30vw;
    }
  }
`;

function VideoGrid({ children }: VideoGridProps) {
  return (
    <VideoGridContainer className="video-grid">{children}</VideoGridContainer>
  );
}

export default VideoGrid;
