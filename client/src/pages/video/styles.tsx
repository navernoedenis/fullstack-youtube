import styled from "@emotion/styled";
import MuiBox from "@mui/material/Box";

export const VideoPageContainer = styled(MuiBox)`
  margin: 0 auto;
  max-width: 1754px;
  width: 100%;
  display: flex;
  align-items: flex-start;

  @media screen and (max-width: 873px) {
    flex-direction: column;
  }
`;

export const Main = styled(MuiBox)`
  width: 100%;
`;

export const VideoPlayerContainer = styled(MuiBox)`
  position: relative;
  height: 40vw;
  max-height: 665px;

  @media screen and (max-width: 873px) {
    height: 50vw;
  }
`;

export const VideoRecommendationsContainer = styled(MuiBox)`
  margin-left: 24px;
  max-width: 402px;
  width: 100%;

  @media screen and (max-width: 1951px) {
    margin-left: 20px;
    max-width: 370px;
  }

  @media screen and (max-width: 1200px) {
    margin-left: 18px;
    max-width: 25vw;
  }

  @media screen and (max-width: 873px) {
    margin-left: 0;
    max-width: none;
  }
`;
