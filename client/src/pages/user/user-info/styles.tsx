import styled from "@emotion/styled";
import MuiAvatar from "@mui/material/Avatar";
import MuiBox from "@mui/material/Box";
import MuiTypography from "@mui/material/Typography";

export const UserInfoContainer = styled(MuiBox)``;

export const CoverImage = styled(MuiBox)`
  height: 270px;
  width: 100%;
  background-size: cover;
  background-position: center;

  @media screen and (max-width: 1951px) {
    height: 12vw;
  }

  @media screen and (max-width: 1200px) {
    height: 14vw;
  }

  @media screen and (max-width: 873px) {
    height: 18vw;
  }

  @media screen and (max-width: 587px) {
    height: 22vw;
  }
`;

export const Header = styled(MuiBox)`
  margin: 0 auto;
  max-width: 1284px;
  padding: 20px 60px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 873px) {
    padding-right: 20px;
    padding-left: 20px;
  }

  @media screen and (max-width: 587px) {
    padding-right: 0;
    padding-left: 0;
  }
`;

export const User = styled(MuiBox)`
  display: flex;
  align-items: center;
`;

export const Avatar = styled(MuiAvatar)`
  height: 80px;
  width: 80px;
`;

export const Description = styled(MuiBox)`
  margin-left: 10px;
`;

export const Username = styled(MuiTypography)`
  font-size: 24px;
  text-transform: capitalize;
`;

export const Subscribers = styled(MuiTypography)`
  font-size: 14px;
`;
