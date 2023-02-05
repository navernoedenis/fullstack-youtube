import styled from "@emotion/styled";
import MuiBox from "@mui/material/Box";

export const TabsContainer = styled(MuiBox)`
  border-bottom: 1px solid var(--divider-color);
`;

export const TabsWrapper = styled(MuiBox)`
  margin: 0 auto;
  max-width: 1284px;
  padding: 0 40px;

  @media screen and (max-width: 873px) {
    padding: 0;
  }
`;
