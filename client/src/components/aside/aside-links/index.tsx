import React, { PropsWithChildren } from "react";
import { AsideLinksContainer, Title, Links } from "./styles";

interface AsideLinksProps extends PropsWithChildren {
  isLast?: boolean;
  title?: string;
}

function AsideLinks({ isLast, title, children }: AsideLinksProps) {
  return (
    <AsideLinksContainer isLast={!!isLast}>
      {title && <Title>{title}</Title>}
      <Links>{children}</Links>
    </AsideLinksContainer>
  );
}

AsideLinks.defaultProps = {
  isLast: false,
  title: "",
};

export default AsideLinks;
