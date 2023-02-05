import styled from "@emotion/styled";

import MuiAvatar from "@mui/material/Avatar";
import MuiBox from "@mui/material/Box";
import MuiButton from "@mui/material/Button";
import MuiCard from "@mui/material/Card";
import MuiIconButton from "@mui/material/IconButton";
import MuiStack from "@mui/material/Stack";
import MuiTextField from "@mui/material/TextField";
import MuiTypography from "@mui/material/Typography";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

export const LoginAndRegisterCardContainer = styled(MuiCard)`
  margin: auto;
  position: relative;
  width: 448px;
  padding: 40px;
  overflow: visible;
  background-color: var(--color-bg);
  color: var(--color-text);
`;

export const AvatarPreview = styled(MuiAvatar)`
  position: absolute;
  top: -45px;
  left: 50%;
  transform: translateX(-50%);
  height: 80px;
  width: 80px;
  background-color: var(--register-user-avatar-bg);
`;

export const Header = styled(MuiBox)`
  text-align: center;
`;

export const Title = styled(MuiTypography)`
  font-size: 24px;
  font-weight: 500;
`;

export const Heading = styled(MuiTypography)`
  margin-top: 10px;
  font-size: 16px;
`;

export const Form = styled(MuiBox)`
  margin-top: 24px;
`;

export const FormFields = styled(MuiStack)``;

export const FormField = styled(MuiTextField)``;

export const FormButtons = styled(MuiBox)`
  margin-top: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const AvatarButton = styled(MuiButton)`` as typeof MuiButton;

export const FormButton = styled(MuiButton)``;

export const CloseButton = styled(MuiIconButton)`
  position: absolute;
  top: 1.5%;
  right: 1%;
`;

export const CloseButtonIcon = styled(CloseRoundedIcon)`
  font-size: 35px;
  color: var(--color-text);
`;
