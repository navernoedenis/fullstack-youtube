import React, { ReactElement } from "react";
import { AsideLinkContainer, Avatar, MediaBlock, Text } from "./styles";

interface AsideLinkProps {
  to: string;
  media: ReactElement | string;
  children: string;
}

function AsideLink({ to, media, children }: AsideLinkProps) {
  const isMediaImage = typeof media === "string";

  return (
    <AsideLinkContainer to={to}>
      <MediaBlock>{isMediaImage ? <Avatar src={media} /> : media}</MediaBlock>
      <Text className="link-text">{children}</Text>
    </AsideLinkContainer>
  );
}

export default AsideLink;
