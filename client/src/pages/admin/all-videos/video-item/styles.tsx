import styled from "@emotion/styled";
import { Link } from "react-router-dom";

import MuiBox from "@mui/material/Box";
import MuiButton from "@mui/material/Button";
import MuiTypography from "@mui/material/Typography";

export const VideoItemContainer = styled(MuiBox)`
  display: flex;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid var(--divider-color);

  &:last-child {
    border-bottom-color: transparent;
  }
`;

export const Thumnbail = styled(MuiBox)`
  flex-shrink: 0;
  border-radius: 10px;
  height: 140px;
  width: 240px;
  background-color: var(--constant-black);
  background-size: cover;
  background-position: center center;
`;

export const InformationList = styled(MuiBox)`
  padding: 0 10px;
`;

export const InformationItem = styled(MuiBox)`
  font-size: 15px;
`;

export const AuthorLink = styled(Link)`
  text-transform: capitalize;
`;

export const Title = styled(MuiTypography)`
  margin-right: 5px;
  font-size: 17px;
  font-weight: 600;
  text-transform: capitalize;
`;

export const Manage = styled(MuiBox)`
  margin-left: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;

  button {
    min-width: 120px;
    transition: var(--global-transition);
    text-transform: capitalize;

    &:hover {
      opacity: 0.8;
    }
  }
`;

export const VisitButton = styled(MuiButton)``;

export const EditButton = styled(MuiButton)``;

export const DeleteButton = styled(MuiButton)`
  border-radius: 0;

  &.MuiButton-contained {
    color: var(--constant-white);
    background-color: var(--color-red);
  }
`;
