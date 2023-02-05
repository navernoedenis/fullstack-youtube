import styled from "@emotion/styled";
import MuiAvatar from "@mui/material/Avatar";
import MuiBox from "@mui/material/Box";
import MuiIconButton from "@mui/material/IconButton";
import MuiSkeleton from "@mui/material/Skeleton";

export const UserPanelContainer = styled(MuiBox)`
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const UserMenuButton = styled(MuiIconButton)`
  color: var(--text-color);
`;

export const Avatar = styled(MuiAvatar)`
  height: 32px;
  width: 32px;
  cursor: pointer;
`;

export const AvatarSkeleton = styled(MuiSkeleton)`
  height: 32px;
  width: 32px;
`;
