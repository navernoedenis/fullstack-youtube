import styled from "@emotion/styled";
import MuiBox from "@mui/material/Box";

import { shouldForwardProp } from "helpers/styled";

export const DrawerContainer = styled(MuiBox)`
  z-index: 100;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  background-color: green;
  transition: var(--global-transition);
`;

export const AsideContainer = styled(MuiBox, shouldForwardProp("isOpen"))<{
  isOpen: boolean;
}>`
  z-index: 100;
  position: fixed;
  top: var(--header-height);
  left: 0;
  bottom: 0;
  background-color: var(--aside-bg);
  transform: translateX(${({ isOpen }) => (isOpen ? 0 : "-100%")});
  transition: transform var(--global-transition);
`;
