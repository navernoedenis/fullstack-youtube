import React, { useState } from "react";
import { useAuth } from "context/auth";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { subscribeAtUser } from "api/user";
import { User } from "types/user";
import { SubscribeButtonContainer } from "./styles";

interface SubscribeButtonProps {
  user: User;
}

function SubscribeButton({ user }: SubscribeButtonProps) {
  const queryClient = useQueryClient();
  const [isSubscribed, setSubscribed] = useState(user.statistic.isSubscribed);

  const { me } = useAuth();
  const { t } = useTranslation("translation", {
    keyPrefix: "components.subscribe-button",
  });

  const { mutate: subscribeAtUserMutate } = useMutation(
    () => subscribeAtUser(user.id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["my-subscriptions"] });
        queryClient.invalidateQueries({
          queryKey: ["user-profile", user.profile.username],
        });
        queryClient.invalidateQueries({
          queryKey: ["video"],
          refetchType: "all",
        });
      },
    }
  );

  const onSubcribe = () => {
    setSubscribed((prev) => !prev);
    subscribeAtUserMutate();
  };

  if (!me || me.id === user.id) {
    return null;
  }

  return (
    <SubscribeButtonContainer
      className={`${isSubscribed ? "subscribed" : ""}`}
      onClick={onSubcribe}
    >
      {isSubscribed ? t("subscribed") : t("subscribe")}
    </SubscribeButtonContainer>
  );
}

export default SubscribeButton;
