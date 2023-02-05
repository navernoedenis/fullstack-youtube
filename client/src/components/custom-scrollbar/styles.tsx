import styled from "@emotion/styled";
import MuiBox from "@mui/material/Box";

export const Wrapper = styled(MuiBox)`
  padding-right: 12px;
`;

export const Track = styled(MuiBox)`
  position: absolute;
  width: 6px;
  top: 2px;
  right: 2px;
  bottom: 2px;
  z-index: 2000;
`;

export const Line = styled(MuiBox)`
  border-radius: 4px;
  background-color: var(--custom-scrollbar-line-bg);
`;
