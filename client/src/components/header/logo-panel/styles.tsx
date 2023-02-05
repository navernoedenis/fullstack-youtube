import styled from "@emotion/styled";
import MuiBox from "@mui/material/Box";
import MuiIconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import { ReactComponent as YoutubeIcon } from "assets/icons/logo.svg";

export const LogoPanelContainer = styled(MuiBox)`
  display: flex;
  align-items: center;
  flex-shrink: 0;
`;

export const AsideButton = styled(MuiIconButton)`
  margin-right: 16px;
`;

export const AsideButtonIcon = styled(MenuIcon)`
  color: var(--header-drawer-button-icon-color);
`;

export const LogoIcon = styled(YoutubeIcon)`
  .logo-text {
    fill: var(--header-logo-text-color);
  }
`;
