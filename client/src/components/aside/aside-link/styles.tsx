import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";

import MuiAvatar from "@mui/material/Avatar";
import MuiBox from "@mui/material/Box";
import MuiTypography from "@mui/material/Typography";

export const AsideLinkContainer = styled(NavLink)`
  display: flex;
  align-items: center;
  border-radius: 10px;
  min-height: 40px;
  padding: 0 12px;
  transition: var(--global-transition);

  &:hover {
    background-color: var(--aside-link-active-bg);
  }

  &.active {
    background-color: var(--aside-link-active-bg);

    .link-text {
      font-weight: 500;
    }
  }
`;

export const MediaBlock = styled(MuiBox)`
  margin-right: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Avatar = styled(MuiAvatar)`
  height: 24px;
  width: 24px;
`;

export const Text = styled(MuiTypography)`
  font-size: 14px;
  text-transform: capitalize;
`;
