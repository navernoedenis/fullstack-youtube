import styled from "@emotion/styled";
import MuiBox from "@mui/material/Box";

export const ModalShadowContainer = styled(MuiBox)`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: var(--color-black-transparent-04);
  z-index: 3000;
  display: flex;
  padding: 16px;
`;

export const ChildrenContainer = styled(MuiBox)`
  height: 100%;
  width: 100%;
  display: flex;
`;
