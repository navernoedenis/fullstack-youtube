import React, { ReactNode } from "react";
import styled from "@emotion/styled";
import MuiBox from "@mui/material/Box";

import { useSettings } from "context";
import { shouldForwardProp } from "helpers/styled";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayoutContainer = styled(MuiBox, shouldForwardProp("isOpen"))<{
  isOpen: boolean;
}>`
  padding-top: calc(var(--header-height) + 13px);
  padding-right: 40px;
  padding-bottom: 30px;
  padding-left: ${({ isOpen }) => (isOpen ? "var(--aside-width)" : "40px")};
  transition: var(--global-transition);

  @media screen and (max-width: 1951px) {
    padding-right: 30px;
    padding-left: ${({ isOpen }) => (isOpen ? "var(--aside-width)" : "30px")};
  }

  @media screen and (max-width: 1200px) {
    padding-right: 24px;
    padding-left: 24px;
  }

  @media screen and (max-width: 587px) {
    padding-right: 18px;
    padding-left: 18px;
  }
`;

function MainLayout({ children }: MainLayoutProps) {
  const { isAsideOpen, isMobile } = useSettings();

  const isOpen = !isMobile && isAsideOpen;

  return <MainLayoutContainer isOpen={isOpen}>{children}</MainLayoutContainer>;
}

export default MainLayout;
