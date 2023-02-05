import styled from "@emotion/styled";
import MuiBox from "@mui/material/Box";
import MuiTypography from "@mui/material/Typography";

export const SubmenuContainer = styled(MuiBox)``;

export const SubmenuHeader = styled(MuiBox)`
  display: flex;
  align-items: center;
  padding: 4px;
  border-bottom: 1px solid var(--divider-color);
`;

export const SubmenuIcon = styled(MuiBox)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 40px;
  cursor: pointer;
  color: var(--color-text);
`;

export const SubmenuTitle = styled(MuiTypography)`
  text-transform: capitalize;
  color: var(--color-text);
`;
