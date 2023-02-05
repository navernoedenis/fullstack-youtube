import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import MuiAvatar from "@mui/material/Avatar";
import MuiBox from "@mui/material/Box";
import MuiTypography from "@mui/material/Typography";

export const UserChannelContainer = styled(MuiBox)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
`;

export const UserLink = styled(Link)`
  margin-bottom: 16px;
  text-align: center;
`;

export const Avatar = styled(MuiAvatar)`
  height: 103px;
  width: 103px;
`;

export const Username = styled(MuiTypography)`
  margin: 4px 0;
  font-size: 14px;
  text-transform: capitalize;
`;

export const Subscribers = styled(MuiTypography)`
  font-size: 12px;
`;
