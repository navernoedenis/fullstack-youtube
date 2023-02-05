import React from "react";
import { useTranslation } from "react-i18next";

import HomeIcon from "@mui/icons-material/HomeOutlined";
import LikeIcon from "@mui/icons-material/ThumbUpAltOutlined";
import MyVideoIcon from "@mui/icons-material/OndemandVideoOutlined";
import SubscriptionsIcon from "@mui/icons-material/SubscriptionsOutlined";

import { useAuth } from "context/auth";

import AsideLink from "../aside-link";
import AsideLinks from "../aside-links";

function MyPanel() {
  const { me } = useAuth();
  const { t } = useTranslation("translation", {
    keyPrefix: "components.aside.my_panel",
  });

  return (
    <AsideLinks>
      <AsideLink to="/" media={<HomeIcon />}>
        {t("home")}
      </AsideLink>

      {me && (
        <>
          <AsideLink to="/my-subscriptions" media={<SubscriptionsIcon />}>
            {t("subscriptions")}
          </AsideLink>

          <AsideLink to="/my-videos" media={<MyVideoIcon />}>
            {t("your_videos")}
          </AsideLink>

          <AsideLink to="/liked-videos" media={<LikeIcon />}>
            {t("liked_videos")}
          </AsideLink>
        </>
      )}
    </AsideLinks>
  );
}

export default MyPanel;
