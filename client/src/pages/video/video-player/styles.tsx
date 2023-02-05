import styled from "@emotion/styled";
import MuiBox from "@mui/material/Box";
import MuiIconButton from "@mui/material/IconButton";
import MuiTypography from "@mui/material/Typography";

export const VideoPlayerContainer = styled(MuiBox)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: var(--constant-black);

  &:hover .management {
    opacity: 1;
  }
`;

export const Wrapper = styled(MuiBox)`
  position: relative;
  height: 100%;
  width: 100%;
`;

export const Video = styled("video")`
  display: block;
  height: 100%;
  width: 100%;

  ::-webkit-media-controls {
    display: none;
  }
`;

export const Management = styled(MuiBox)`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  transition: var(--global-transition);
`;

export const Progress = styled(MuiBox)`
  position: relative;
  width: 100%;
  height: 3px;
  background: var(--color-white-transparent-02);
  transition: 120ms ease-in-out;
  overflow: hidden;
  cursor: pointer;

  &:hover {
    height: 10px;
  }
`;

export const ProgressBar = styled(MuiBox)`
  height: 100%;
  background-color: var(--color-red);
`;

export const Volume = styled(MuiBox)`
  overflow: hidden;
  position: relative;
  width: 52px;
  height: 5px;
  cursor: pointer;
  background-color: var(--color-white-transparent-02);
  transition: 120ms ease-in-out;
`;

export const VolumeBar = styled(MuiBox)`
  height: 100%;
  background-color: var(--color-red);
`;

export const Buttons = styled(MuiBox)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const IconButton = styled(MuiIconButton)`
  padding: 10px;
  color: var(--constant-white);

  & svg {
    height: 26px;
    width: 26px;
  }
`;

export const LeftButtons = styled(MuiBox)`
  display: flex;
  align-items: center;
`;

export const TimeDuration = styled(MuiTypography)`
  margin-left: 10px;
  flex-shrink: 0;
  font-size: 14px;
  color: var(--constant-white);
`;

export const RightButtons = styled(MuiBox)`
  display: flex;
  align-items: center;
`;
