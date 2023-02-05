import styled from "@emotion/styled";
import MuiAvatar from "@mui/material/Avatar";
import MuiBox from "@mui/material/Box";
import MuiSkeleton from "@mui/material/Skeleton";
import MuiTypography from "@mui/material/Typography";

export const UserInfoContainer = styled(MuiBox)`
  border-bottom: 1px solid var(--divider-color);
  display: flex;
  padding: 16px;
`;

export const Avatar = styled(MuiAvatar)`
  height: 40px;
  width: 40px;
`;

export const AvatarSkeleton = styled(MuiSkeleton)`
  height: 40px;
  width: 40px;
`;

export const Info = styled(MuiBox)`
  margin-left: 16px;
`;

export const Username = styled(MuiTypography)`
  color: var(--color-text);
  text-transform: capitalize;
`;

export const Email = styled(MuiTypography)`
  color: var(--color-text);
`;
