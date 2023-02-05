import styled from "@emotion/styled";
import MuiBox from "@mui/material/Box";
import MuiTypography from "@mui/material/Typography";
import ArrowRightIcon from "@mui/icons-material/ArrowForwardIosRounded";

export const MenuGroupItemContainer = styled(MuiBox)`
  display: flex;
  align-items: center;
  height: 40px;
  padding: 0 8px;
  cursor: pointer;
  color: var(--color-text);

  &:hover {
    background-color: var(--user-menu-item-hover-bg);
  }
`;

export const IconBlock = styled(MuiBox)`
  margin-right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 40px;
`;

export const Text = styled(MuiTypography)``;

export const ArrowIcon = styled(ArrowRightIcon)`
  margin-left: auto;
  flex-shrink: 0;
  font-size: 16px;
`;
