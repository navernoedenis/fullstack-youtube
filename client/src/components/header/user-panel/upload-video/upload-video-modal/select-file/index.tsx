import React from "react";
import { useTranslation } from "react-i18next";
import {
  SelectFileButton,
  SelectFileContainer,
  UploadButton,
  UploadButtonIcon,
  Heading,
  Hint,
} from "./styles";

interface SelectFileProps {
  selectFile: () => void;
}

function SelectFile({ selectFile }: SelectFileProps) {
  const { t } = useTranslation("translation", {
    keyPrefix: "components.header.select-file",
  });

  return (
    <SelectFileContainer>
      <UploadButton onClick={selectFile} disableRipple>
        <UploadButtonIcon />
      </UploadButton>

      <Heading>{t("heading")}</Heading>
      <Hint>{t("hint")}.</Hint>

      <SelectFileButton onClick={selectFile}>{t("button")}</SelectFileButton>
    </SelectFileContainer>
  );
}

export default SelectFile;
