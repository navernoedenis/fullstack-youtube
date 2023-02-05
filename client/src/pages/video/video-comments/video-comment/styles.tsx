import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import MuiAvatar from "@mui/material/Avatar";
import MuiBox from "@mui/material/Box";
import MuiIconButton from "@mui/material/IconButton";
import MuiTypography from "@mui/material/Typography";

export const VideoCommentContainer = styled(MuiBox)`
  display: flex;
`;

export const Avatar = styled(MuiAvatar)`
  margin-right: 10px;
  flex-shrink: 0;
  height: 40px;
  width: 40px;
`;

export const Main = styled(MuiBox)`
  position: relative;
  width: 100%;
  padding-right: 40px;
`;

export const Header = styled(MuiBox)`
  display: flex;
  align-items: center;
`;

export const Username = styled(Link)`
  margin-right: 5px;
  font-size: 13px;
  text-transform: capitalize;

  &:hover {
    opacity: 0.8;
  }
`;

export const CreatedAt = styled(MuiBox)`
  font-size: 12px;
`;

export const Message = styled(MuiBox)``;

export const Footer = styled(MuiBox)`
  display: flex;
`;

export const ButtonContainer = styled(MuiBox)`
  display: flex;
  align-items: center;
`;

export const Button = styled(MuiIconButton)`
  color: var(--color-text);
`;

export const ButtonText = styled(MuiTypography)`
  min-width: 20px;
`;
