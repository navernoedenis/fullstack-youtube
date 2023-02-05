import React, { MouseEvent } from "react";

import ArrowBackIcon from "@mui/icons-material/ArrowBackRounded";

import Appearance from "./appearance";
import Language from "./language";

import { SubmenuType } from "./types";

import {
  SubmenuContainer,
  SubmenuHeader,
  SubmenuIcon,
  SubmenuTitle,
} from "./styles";

interface SubmenuProps {
  onClose: (event: MouseEvent<HTMLDivElement>) => void;
  title: string;
  type: SubmenuType;
}

function Submenu({ onClose, title, type }: SubmenuProps) {
  return (
    <SubmenuContainer>
      <SubmenuHeader>
        <SubmenuIcon onClick={onClose}>
          <ArrowBackIcon />
        </SubmenuIcon>

        <SubmenuTitle>{title}</SubmenuTitle>
      </SubmenuHeader>

      {type === "appearance" && <Appearance />}
      {type === "language" && <Language />}
    </SubmenuContainer>
  );
}

export default Submenu;
