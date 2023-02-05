import styled from "@emotion/styled";
import MuiBox from "@mui/material/Box";

export const HeaderContainer = styled(MuiBox)`
  position: fixed;
  right: 0;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: var(--header-height);
  padding: 0 16px;
  background-color: var(--header-bg);
  z-index: 1000;
`;
