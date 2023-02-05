import styled from "@emotion/styled";
import MuiBox from "@mui/material/Box";

export const UserPageContainer = styled(MuiBox)``;

export const Main = styled(MuiBox)`
  margin: 0 auto;
  max-width: 1284px;
  padding: 20px;

  @media screen and (max-width: 873px) {
    padding-right: 0;
    padding-left: 0;
  }
`;
