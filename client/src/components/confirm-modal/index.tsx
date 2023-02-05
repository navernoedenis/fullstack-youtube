import React from "react";
import { useTranslation } from "react-i18next";
import {
  Buttons,
  CancelButton,
  ConfirmButton,
  ConfirmModalContainer,
  Text,
  Title,
} from "./styles";

interface ConfirmModalProps {
  cancelButtonText?: string;
  confirmButtonText?: string;
  onCancel: () => void;
  onCofirm: () => void;
  text: string;
  title?: string;
}

function ConfirmModal({
  cancelButtonText,
  confirmButtonText,
  onCancel,
  onCofirm,
  text,
  title,
}: ConfirmModalProps) {
  const { t } = useTranslation("translation", {
    keyPrefix: "components.confirm-modal",
  });

  return (
    <ConfirmModalContainer>
      <Title variant="subtitle1">{title}</Title>
      <Text variant="caption">{text}</Text>
      <Buttons>
        <CancelButton onClick={onCancel}>
          {cancelButtonText || t("cancel")}
        </CancelButton>
        <ConfirmButton onClick={onCofirm}>
          {confirmButtonText || t("confirm")}
        </ConfirmButton>
      </Buttons>
    </ConfirmModalContainer>
  );
}

ConfirmModal.defaultProps = {
  cancelButtonText: "",
  confirmButtonText: "",
  title: "",
};

export default ConfirmModal;
