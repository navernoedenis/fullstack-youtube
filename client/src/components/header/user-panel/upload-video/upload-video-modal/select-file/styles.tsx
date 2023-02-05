import styled from "@emotion/styled";
import MuiBox from "@mui/material/Box";
import MuiButton from "@mui/material/Button";
import MuiTypography from "@mui/material/Typography";
import MuiIconButton from "@mui/material/IconButton";

import MuiUploadIcon from "@mui/icons-material/Upload";

export const SelectFileContainer = styled(MuiBox)`
  text-align: center;
`;

export const UploadButton = styled(MuiIconButton)`
  height: 136px;
  width: 136px;
  color: var(--upload-video-icon-color);
  background-color: var(--upload-video-icon-button-bg);

  &:hover {
    background-color: var(--upload-video-icon-button-bg);
  }
`;

export const UploadButtonIcon = styled(MuiUploadIcon)`
  font-size: 64px;
`;

export const Heading = styled(MuiTypography)`
  margin-top: 23px;
  font-size: 15px;
`;

export const Hint = styled(MuiTypography)`
  margin-top: 2px;
  font-size: 13px;
`;

export const SelectFileButton = styled(MuiButton)`
  margin-top: 26px;
  font-size: 14px;
  text-transform: uppercase;
`;
