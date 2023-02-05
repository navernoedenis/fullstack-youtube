import styled from "@emotion/styled";
import MuiBox from "@mui/material/Box";
import MuiTypography from "@mui/material/Typography";

export const UserChannelsContainer = styled(MuiBox)``;

export const Title = styled(MuiTypography)`
  margin-bottom: 20px;
  font-size: 16px;
`;

export const ChannelsList = styled(MuiBox)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: 1fr;

  @media screen and (max-width: 1200px) {
    grid-template-columns: repeat(5, 1fr);
  }

  @media screen and (max-width: 873px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media screen and (max-width: 587px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;
