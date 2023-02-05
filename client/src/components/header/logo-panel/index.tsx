import React from "react";
import { Link } from "react-router-dom";
import { useSettings } from "context";
import {
  AsideButton,
  AsideButtonIcon,
  LogoIcon,
  LogoPanelContainer,
} from "./styles";

function LogoPanel() {
  const { toggleAside } = useSettings();

  return (
    <LogoPanelContainer>
      <AsideButton onClick={toggleAside}>
        <AsideButtonIcon />
      </AsideButton>

      <Link to="/">
        <LogoIcon />
      </Link>
    </LogoPanelContainer>
  );
}

export default LogoPanel;
