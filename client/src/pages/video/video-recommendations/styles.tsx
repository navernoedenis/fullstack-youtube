import styled from "@emotion/styled";
import MuiBox from "@mui/material/Box";

export const VideoRecommendationsContainer = styled(MuiBox)`
  display: flex;
  flex-shrink: 0;
  width: 100%;
  flex-direction: column;
  gap: 10px;

  .video-link {
    display: flex;
    align-items: flex-start;
  }

  .video-link-thumbnail {
    margin-right: 10px;
    height: 94px;
    width: 168px;
  }

  .video-link-information {
    margin-top: 0;
  }

  .video-link-avatar {
    display: none;
  }

  .custom-title {
    font-size: 20px;
    font-weight: 500;
  }

  @media screen and (max-width: 1200px) {
    .video-link-thumbnail {
      height: 6.5vw;
      width: 10vw;
    }
  }

  @media screen and (max-width: 873px) {
    margin-top: 20px;
    margin-left: 0;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0;

    .video-link {
      width: 50%;
      padding: 10px;
      padding-left: 0;
    }

    .video-link-thumbnail {
      height: 12vw;
      width: 20vw;
    }
  }

  @media screen and (max-width: 587px) {
    flex-direction: column;

    .video-link {
      width: 100%;
      padding-right: 0;
    }

    .video-link-thumbnail {
      height: 18vw;
      width: 30vw;
    }
  }
`;
