import styled from "@emotion/styled";
import MuiBox from "@mui/material/Box";

import { shouldForwardProp } from "helpers/styled";

export const MenuGroupContainer = styled(MuiBox, shouldForwardProp("isLast"))<{
  isLast?: boolean;
}>`
  padding: 5px 0;
  border-bottom: 1px solid
    ${({ isLast }) => (isLast ? "transparent" : "var(--divider-color)")};
`;
