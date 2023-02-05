import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import MuiBox from "@mui/material/Box";
import MuiAvatar from "@mui/material/Avatar";
import MuiTypography from "@mui/material/Typography";

export const VideoAuthorContainer = styled(MuiBox)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid var(--divider-color);
`;

export const Author = styled(MuiBox)`
  display: flex;
  align-items: center;
`;

export const Avatar = styled(MuiAvatar)`
  margin-right: 10px;
  height: 40px;
  width: 40px;
`;

export const Credentials = styled(MuiBox)``;

export const Username = styled(Link)`
  font-size: 16px;
  text-transform: capitalize;
`;

export const Subscribers = styled(MuiTypography)`
  font-size: 12px;
`;
