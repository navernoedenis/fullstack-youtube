import React from "react";
import { useTranslation } from "react-i18next";

import { User } from "types/user";
import { getDayMonthAndYear, getMonthName } from "helpers/date";
import {
  Bio,
  Description,
  DescriptionTitle,
  Stats,
  StatsItem,
  UserAboutContainer,
} from "./styles";

interface UserAboutProps {
  user: User;
}

function UserAbout({ user }: UserAboutProps) {
  const { t } = useTranslation("translation", {
    keyPrefix: "pages.user.user-about",
  });

  const { day, year } = getDayMonthAndYear(user.createdAt);
  const month = getMonthName(user.createdAt);

  const { channelViews } = user.statistic;

  return (
    <UserAboutContainer>
      <Description>
        <DescriptionTitle>{t("description")}</DescriptionTitle>
        <Bio>{user.profile.bio}</Bio>
      </Description>

      <Stats>
        <StatsItem>{t("stats")}</StatsItem>
        <StatsItem>
          Joined {month.slice(0, 3)} {day}, {year}
        </StatsItem>
        <StatsItem>
          {channelViews} {channelViews === 1 ? t("view") : t("views")}
        </StatsItem>
      </Stats>
    </UserAboutContainer>
  );
}

export default UserAbout;
