import styled from "@emotion/styled";
import MuiBox from "@mui/material/Box";
import MuiTypography from "@mui/material/Typography";

import { shouldForwardProp } from "helpers/styled";

export const AsideLinksContainer = styled(MuiBox, shouldForwardProp("isLast"))<{
  isLast?: boolean;
}>`
  padding: 12px 0;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: ${({ isLast }) =>
    isLast ? "transparent" : "var(--divider-color)"};
`;

export const Title = styled(MuiTypography)`
  padding: 6px 12px;
  font-size: 16px;
  color: var(--color-text);
`;

export const Links = styled(MuiBox)``;
