import styled from "@emotion/styled";
import MuiBox from "@mui/material/Box";
import MuiButton from "@mui/material/Button";
import MuiCard from "@mui/material/Card";
import MuiTypography from "@mui/material/Typography";

export const ConfirmModalContainer = styled(MuiCard)`
  margin: auto;
  box-shadow: var(--global-shadow);
  max-width: 400px;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px 14px 12px;
  background-color: var(--color-bg);
  color: var(--color-text);
`;

export const Title = styled(MuiTypography)`
  margin-bottom: 10px;
  font-size: 22px;
  font-weight: 500;
  line-height: 1.2;

  &::first-letter {
    text-transform: uppercase;
  }
`;

export const Text = styled(MuiTypography)`
  font-size: 16px;
  line-height: 1.2;
  letter-spacing: 0;

  &::first-letter {
    text-transform: uppercase;
  }
`;

export const Buttons = styled(MuiBox)`
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
  gap: 10px;

  button {
    text-transform: capitalize;
  }
`;

export const CancelButton = styled(MuiButton)``;

export const ConfirmButton = styled(MuiButton)`
  &.MuiButton-contained {
    background-color: var(--color-red);
    color: var(--constant-white);
  }
`;
