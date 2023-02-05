import React from "react";

import LogoPanel from "./logo-panel";
import Search from "./search";
import UserPanel from "./user-panel";

import { HeaderContainer } from "./styles";

function Header() {
  return (
    <HeaderContainer component="header">
      <LogoPanel />
      <Search />
      <UserPanel />
    </HeaderContainer>
  );
}

export default Header;
