import React from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "context";
import { SignInButtonContainer, Icon, Text } from "./styles";

function SignInButton() {
  const { toggleAuthModal } = useAuth();
  const { t } = useTranslation("translation", {
    keyPrefix: "components.sign-in-button",
  });

  return (
    <SignInButtonContainer onClick={toggleAuthModal} variant="outlined">
      <Icon />
      <Text variant="caption">{t("text")}</Text>
    </SignInButtonContainer>
  );
}

export default SignInButton;
