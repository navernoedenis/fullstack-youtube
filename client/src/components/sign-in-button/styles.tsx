import styled from "@emotion/styled";
import MuiButton from "@mui/material/Button";
import MuiTypography from "@mui/material/Typography";

import AccountIcon from "@mui/icons-material/AccountCircleOutlined";

export const SignInButtonContainer = styled(MuiButton)`
  border-radius: 18px;
  border: 1px solid var(--sign-in-button-border-color);
  display: flex;
  align-items: center;
  min-width: 100px;
  padding: 0 8px;
`;

export const Icon = styled(AccountIcon)`
  margin-right: 5px;
  color: var(--sign-in-button-avatar-color);
`;

export const Text = styled(MuiTypography)`
  font-size: 14px;
  line-height: 34px;
  font-weight: 500;
  color: var(--sign-in-button-text-color);
`;
