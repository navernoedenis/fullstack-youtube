import styled from "@emotion/styled";
import MuiAvatar from "@mui/material/Avatar";
import MuiBox from "@mui/material/Box";
import MuiTypography from "@mui/material/Typography";

export const VideoLinkContainer = styled(MuiBox)`
  overflow: hidden;
  flex-shrink: 0;
  cursor: pointer;
`;

export const VideoThumbnail = styled(MuiBox)`
  flex-shrink: 0;
  border-radius: 10px;
  height: 100%;
  width: 100%;
  background-size: cover;
  background-position: center center;
`;

export const VideoInformation = styled(MuiBox)`
  margin-top: 10px;
  display: flex;
`;

export const AuthorImage = styled(MuiAvatar)`
  margin-right: 14px;
  height: 36px;
  width: 36px;

  @media screen and (max-width: 1200px) {
    display: none;
  }
`;

export const Description = styled(MuiBox)``;

export const Title = styled(MuiTypography)`
  overflow: hidden;
  max-height: 50px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-size: 14px;
`;

export const AuthorUsername = styled(MuiBox)`
  font-size: 12px;
  text-transform: capitalize;
  transition: var(--global-transition);

  &:hover {
    opacity: 0.5;
  }
`;

export const Statistic = styled(MuiBox)`
  display: flex;
  align-items: center;
  font-size: 12px;
`;

export const VideoViews = styled(MuiTypography)`
  font-size: inherit;
  white-space: nowrap;
`;

export const Divider = styled(MuiBox)`
  margin: 0 5px;
`;
