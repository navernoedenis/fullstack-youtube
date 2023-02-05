import styled from "@emotion/styled";
import MuiBox from "@mui/material/Box";
import MuiIconButton from "@mui/material/IconButton";

export const SearchContainer = styled(MuiBox)`
  margin: 0 20px;
  border: 1px solid var(--search-border-color);
  border-radius: 20px;
  display: flex;
  align-items: center;
  max-width: 640px;
  width: 100%;
  overflow: hidden;
`;

export const Input = styled("input")`
  border: none;
  outline: none;
  width: 100%;
  padding: 11px;
  padding-left: 16px;
  padding-right: 40px;
  font-size: 16px;
  color: var(--color-text);
  background-color: transparent;
  cursor: pointer;
`;

export const Buttons = styled(MuiBox)`
  position: relative;
`;

export const ClearButton = styled(MuiIconButton)`
  position: absolute;
  top: 0;
  right: 100%;
  padding: 8px;
  color: var(--color-text);
`;

export const SearchButton = styled(MuiIconButton)`
  border-radius: 0;
  border-left: 1px solid var(--search-button-border-color);
  padding: 8px;
  width: 64px;
  color: var(--color-text);
  background-color: var(--search-button-bg);
  transition: var(--global-transition);

  &:hover {
    opacity: 0.8;
  }
`;
