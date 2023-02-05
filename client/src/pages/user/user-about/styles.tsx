import styled from "@emotion/styled";
import MuiBox from "@mui/material/Box";
import MuiTypography from "@mui/material/Typography";

export const UserAboutContainer = styled(MuiBox)`
  display: flex;

  @media screen and (max-width: 873px) {
    flex-direction: column;
  }
`;

export const Description = styled(MuiBox)`
  margin-right: 40px;
  padding-top: 12px;
  width: 100%;

  @media screen and (max-width: 873px) {
    margin-right: 0;
    padding-top: 0;
  }
`;

export const DescriptionTitle = styled(MuiTypography)`
  margin-bottom: 24px;
  text-transform: capitalize;
`;

export const Bio = styled(MuiTypography)``;

export const Stats = styled(MuiBox)`
  flex-shrink: 0;
  max-width: 300px;
  width: 100%;

  @media screen and (max-width: 1200px) {
    max-width: 25vw;
  }

  @media screen and (max-width: 873px) {
    margin-top: 20px;
    max-width: none;
  }
`;

export const StatsItem = styled(MuiTypography)`
  border-bottom: 1px solid var(--divider-color);
  padding: 12px 0;

  &::first-letter {
    text-transform: uppercase;
  }
`;
