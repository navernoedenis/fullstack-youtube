import React, { ReactNode } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";

import { Wrapper, Line, Track } from "./styles";

interface CustomScrollbarProps {
  children: ReactNode;
}

function CustomScrollbar({ children }: CustomScrollbarProps) {
  return (
    <Scrollbars
      autoHide
      autoHideTimeout={300}
      className="custom-scrollbar"
      renderThumbVertical={() => <Line />}
      renderTrackVertical={() => <Track />}
      renderView={() => <div style={{ overflowX: "hidden" }} />}
    >
      <Wrapper>{children}</Wrapper>
    </Scrollbars>
  );
}

export default CustomScrollbar;
