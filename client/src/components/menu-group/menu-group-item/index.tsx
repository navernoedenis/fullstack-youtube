import React, { ReactNode, MouseEvent, PropsWithChildren } from "react";
import { MenuGroupItemContainer, Text, ArrowIcon, IconBlock } from "./styles";

interface MenuGroupItemProps extends PropsWithChildren {
  icon?: ReactNode | null;
  onClick: (event: MouseEvent<HTMLDivElement>) => void;
  subMenuIcon?: boolean;
}

function MenuGroupItem({
  children,
  icon,
  onClick,
  subMenuIcon,
}: MenuGroupItemProps) {
  return (
    <MenuGroupItemContainer onClick={onClick}>
      <IconBlock sx={{ opacity: icon ? 1 : 0 }}>{icon}</IconBlock>
      <Text>{children}</Text>
      {subMenuIcon && <ArrowIcon />}
    </MenuGroupItemContainer>
  );
}

MenuGroupItem.defaultProps = {
  icon: null,
  subMenuIcon: false,
};

export default MenuGroupItem;
