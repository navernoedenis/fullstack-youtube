import styled from "@emotion/styled";
import MuiBox from "@mui/material/Box";
import MuiButton from "@mui/material/Button";
import MuiStack from "@mui/material/Stack";
import MuiTextField from "@mui/material/TextField";

export const Form = styled(MuiBox)`
  max-width: 600px;
  width: 100%;
`;

export const FormFields = styled(MuiStack)``;

export const FormField = styled(MuiTextField)``;

export const FormButtons = styled(MuiBox)`
  margin-top: 16px;
  text-align: right;
`;

export const FormButton = styled(MuiButton)`
  margin-left: 10px;
`;
