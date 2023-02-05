import React, { PropsWithChildren } from "react";
import { MenuGroupContainer } from "./styles";

interface MenuGroupProps extends PropsWithChildren {
  isLast?: boolean;
}

function MenuGroup({ children, isLast }: MenuGroupProps) {
  return <MenuGroupContainer isLast={isLast}>{children}</MenuGroupContainer>;
}

MenuGroup.defaultProps = {
  isLast: false,
};

export default MenuGroup;
