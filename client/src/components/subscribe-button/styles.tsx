import styled from "@emotion/styled";
import MuiButton from "@mui/material/Button";

export const SubscribeButtonContainer = styled(MuiButton)`
  border: 1px solid var(--color-red);
  border-radius: 0;
  min-width: 120px;
  padding-right: 10px;
  padding-left: 10px;
  text-transform: uppercase;

  &.MuiButton-contained {
    background-color: var(--color-bg);
    color: var(--color-red);

    &.subscribed {
      background-color: var(--color-red);
      color: var(--constant-white);
    }
  }
`;
