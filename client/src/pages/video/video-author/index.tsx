import React from "react";
import { useTranslation } from "react-i18next";

import SubscribeButton from "components/subscribe-button";

import { User } from "types/user";
import {
  Author,
  Avatar,
  Credentials,
  Subscribers,
  Username,
  VideoAuthorContainer,
} from "./styles";

interface VideoAuthorProps {
  author: User;
}

function VideoAuthor({ author }: VideoAuthorProps) {
  const { t } = useTranslation("translation", {
    keyPrefix: "pages.video.video-author",
  });

  const { subscribers } = author.statistic;

  return (
    <VideoAuthorContainer>
      <Author>
        <Avatar src={author.profile.avatar || ""} />
        <Credentials>
          <Username to={`/user/${author.profile.username}`}>
            {author.profile.username}
          </Username>
          <Subscribers>
            {subscribers}{" "}
            {subscribers === 1 ? t("subscriber") : t("subscribers")}
          </Subscribers>
        </Credentials>
      </Author>
      <SubscribeButton user={author} />
    </VideoAuthorContainer>
  );
}

export default VideoAuthor;
