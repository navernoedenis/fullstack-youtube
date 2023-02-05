import styled from "@emotion/styled";
import MuiBox from "@mui/material/Box";
import MuiIconButton from "@mui/material/IconButton";
import MuiTypography from "@mui/material/Typography";

export const VideoDescriptionContainer = styled(MuiBox)`
  padding: 10px 0 8px;
  border-bottom: 1px solid var(--divider-color);
`;

export const Title = styled(MuiTypography)`
  font-size: 20px;
  font-weight: 500;
`;

export const BottomSection = styled(MuiBox)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ViewsAndDate = styled(MuiTypography)`
  font-size: 14px;
`;

export const Buttons = styled(MuiBox)`
  display: flex;
  align-items: center;
`;

export const Button = styled(MuiBox)`
  display: flex;
  align-items: center;
`;

export const ButtonIcon = styled(MuiIconButton)`
  color: var(--color-text);
`;

export const ButtonText = styled(MuiTypography)`
  min-width: 20px;
`;
