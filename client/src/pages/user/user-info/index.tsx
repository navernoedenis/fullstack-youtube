import React from "react";
import { useTranslation } from "react-i18next";
import SubscribeButton from "components/subscribe-button";
import { User as UserType } from "types/user";

import {
  Avatar,
  CoverImage,
  Description,
  Header,
  Subscribers,
  User,
  UserInfoContainer,
  Username,
} from "./styles";

interface UserInfoProps {
  user: UserType;
}

function UserInfo({ user }: UserInfoProps) {
  const { t } = useTranslation("translation", {
    keyPrefix: "pages.user.user-info",
  });

  const { profile, statistic } = user;

  return (
    <UserInfoContainer>
      {profile.cover && (
        <CoverImage sx={{ backgroundImage: `url(${user.profile.cover})` }} />
      )}

      <Header>
        <User>
          <Avatar src={profile.avatar || ""} />
          <Description>
            <Username>{profile.username}</Username>
            <Subscribers>
              {statistic.subscribers}{" "}
              {statistic.subscribers === 1 ? t("subscriber") : t("subscribers")}
            </Subscribers>
          </Description>
        </User>
        <SubscribeButton user={user} />
      </Header>
    </UserInfoContainer>
  );
}

export default UserInfo;
