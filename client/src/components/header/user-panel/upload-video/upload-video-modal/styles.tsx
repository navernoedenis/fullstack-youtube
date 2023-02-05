import styled from "@emotion/styled";
import MuiBox from "@mui/material/Box";
import MuiTypography from "@mui/material/Typography";
import MuiIconButton from "@mui/material/IconButton";

import MuiCloseIcon from "@mui/icons-material/CloseRounded";

export const UploadVideoModalContainer = styled(MuiBox)`
  margin: auto;
  border-radius: 10px;
  height: 90vh;
  max-width: 960px;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: var(--upload-video-modal-bg);
`;

export const Header = styled(MuiBox)`
  border-bottom: 1px solid var(--divider-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 64px;
  padding-right: 14px;
  padding-left: 24px;
`;

export const HeaderTitle = styled(MuiTypography)`
  font-size: 20px;
  font-weight: 500;
`;

export const HeaderButton = styled(MuiIconButton)`
  color: var(--color-text);
`;

export const HeaderButtonIcon = styled(MuiCloseIcon)`
  font-size: 28px;
`;

export const Content = styled(MuiBox)`
  position: relative;
  padding: 24px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--global-transition);
`;

export const Hint = styled(MuiBox)`
  padding: 24px;
  text-align: center;
  font-size: 12px;
`;

export const HintTopText = styled(MuiTypography)`
  margin-bottom: 5px;
  font-size: inherit;
`;

export const HintBottomText = styled(MuiTypography)`
  font-size: inherit;
`;
