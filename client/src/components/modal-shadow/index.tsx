import React, { useEffect, PropsWithChildren } from "react";
import Fade from "@mui/material/Fade";
import Zoom from "@mui/material/Zoom";
import { ModalShadowContainer, ChildrenContainer } from "./styles";

const transitionDelay = "200ms";
const transitionDuration = "300ms";

function ModalShadow({ children }: PropsWithChildren) {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <Fade in style={{ transitionDuration }}>
      <ModalShadowContainer>
        <Zoom in style={{ transitionDuration, transitionDelay }}>
          {/* grow will pass ref on a div element */}
          {/* it helps to avoid wrapping LoginAndRegisterCard in forwardRef inside */}
          <ChildrenContainer
            onClick={(event) => event.stopPropagation()}
            aria-hidden
          >
            {children}
          </ChildrenContainer>
        </Zoom>
      </ModalShadowContainer>
    </Fade>
  );
}

export default ModalShadow;
