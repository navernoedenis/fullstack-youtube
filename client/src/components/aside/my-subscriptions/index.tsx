import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

import { getUserSubscriptions } from "api/user";
import { User } from "types/user";

import AsideLink from "../aside-link";
import AsideLinks from "../aside-links";

interface MySubscriptionsProps {
  me: User;
}

function MySubscriptions({ me }: MySubscriptionsProps) {
  const { t } = useTranslation("translation", {
    keyPrefix: "components.aside.subscriptions",
  });

  const { data: subscriptions = [] } = useQuery({
    queryKey: ["my-subscriptions"],
    queryFn: () => getUserSubscriptions(me.profile.username),
  });

  return (
    <AsideLinks title={t("title") as string} isLast>
      {subscriptions.map((s) => (
        <AsideLink
          to={`/user/${s.profile.username}`}
          media={s.profile.avatar || ""}
          key={s.id}
        >
          {s.profile.username}
        </AsideLink>
      ))}
    </AsideLinks>
  );
}

export default MySubscriptions;
