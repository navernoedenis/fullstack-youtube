import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { getUserSubscriptions } from "api/user";

import CustomTitle from "components/custom-title";
import UserChannel from "./user-channel";

import { UserChannelsContainer, Title, ChannelsList } from "./styles";

interface UserChannelsProps {
  username: string;
}

function UserChannels({ username }: UserChannelsProps) {
  const { t } = useTranslation("translation", {
    keyPrefix: "pages.user.user-channels",
  });

  const { isLoading, data: subscriptions = [] } = useQuery({
    queryKey: ["user-channels", username],
    queryFn: () => getUserSubscriptions(username),
  });

  if (isLoading) {
    return <h2>Loading..</h2>;
  }

  return (
    <UserChannelsContainer>
      {subscriptions.length ? (
        <>
          <Title>Subscriptions</Title>
          <ChannelsList>
            {subscriptions?.map((subscription) => (
              <UserChannel key={subscription.id} user={subscription} />
            ))}
          </ChannelsList>
        </>
      ) : (
        <CustomTitle align="center">{t("no-channels")}</CustomTitle>
      )}
    </UserChannelsContainer>
  );
}

export default UserChannels;
