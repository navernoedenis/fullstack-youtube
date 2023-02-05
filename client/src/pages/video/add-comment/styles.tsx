import styled from "@emotion/styled";
import MuiAvatar from "@mui/material/Avatar";
import MuiBox from "@mui/material/Box";
import MuiTextField from "@mui/material/TextField";
import MuiButton from "@mui/material/Button";

export const AddCommentContainer = styled(MuiBox)`
  display: flex;
  align-items: flex-start;
  padding: 20px 0;
`;

export const Avatar = styled(MuiAvatar)`
  flex-shrink: 0;
  margin-right: 10px;
  height: 40px;
  width: 40px;
`;

export const Form = styled(MuiBox)`
  width: 100%;
`;

export const MessageField = styled(MuiTextField)`
  width: 100%;
`;

export const Buttons = styled(MuiBox)`
  margin-top: 10px;

  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
`;

export const Button = styled(MuiButton)``;
