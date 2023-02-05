import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import UploadedTime from "components/uploaded-time";

import { Video } from "types/video";
import { VideoAuthorImageSkeleton } from "./skeleton";

import {
  AuthorImage,
  AuthorUsername,
  Description,
  Divider,
  Statistic,
  Title,
  VideoInformation,
  VideoLinkContainer,
  VideoThumbnail,
  VideoViews,
} from "./styles";

interface VideoItemProps {
  video: Video;
}

function VideoLink({ video }: VideoItemProps) {
  const navigate = useNavigate();
  const [isAuthorImageLoaded, setAuthorImageLoaded] = useState(false);

  const { t } = useTranslation("translation", {
    keyPrefix: "components.video-link",
  });

  const { avatar } = video.user.profile;

  return (
    <VideoLinkContainer
      className="video-link"
      onClick={() => navigate(`/video/${video.id}`)}
    >
      <VideoThumbnail
        className="video-link-thumbnail"
        sx={{ backgroundImage: `url(${video.thumbnail})` }}
      />

      <VideoInformation className="video-link-information">
        {avatar && !isAuthorImageLoaded && <VideoAuthorImageSkeleton />}

        {avatar ? (
          <AuthorImage
            className="video-link-avatar"
            onLoad={() => setAuthorImageLoaded(true)}
            src={avatar}
            sx={{ display: isAuthorImageLoaded ? "flex" : "none" }}
          />
        ) : (
          <AuthorImage className="video-link-avatar" src="" />
        )}

        <Description>
          <Title className="video-link-title">{video.title}</Title>
          <AuthorUsername
            onClick={(event) => {
              event.stopPropagation();
              navigate(`/user/${video.user.profile.username}`);
            }}
          >
            {video.user.profile.username}
          </AuthorUsername>

          <Statistic>
            <VideoViews>
              {video.statistic.views} {t("views")}
            </VideoViews>
            <Divider>•</Divider>
            <UploadedTime date={video.createdAt} />
          </Statistic>
        </Description>
      </VideoInformation>
    </VideoLinkContainer>
  );
}

export default VideoLink;
