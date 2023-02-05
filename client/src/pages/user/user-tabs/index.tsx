import React, { useState } from "react";
import { useLocation, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import { TabsContainer, TabsWrapper } from "./styles";

type TabValue = "videos" | "about" | "channels";

const tabs: {
  label: string;
  value: TabValue;
}[] = [
  {
    label: "videos",
    value: "videos",
  },
  {
    label: "channels",
    value: "channels",
  },
  {
    label: "about",
    value: "about",
  },
];

function UserTabs() {
  const location = useLocation();
  const params = location.pathname.split("/");
  const param = params[params.length - 1] as TabValue;

  const [activeTab, setActiveTab] = useState<TabValue>(() => {
    const isInitialVisit = params.length === 3;
    return isInitialVisit ? "videos" : param;
  });

  const { t } = useTranslation("translation", {
    keyPrefix: "pages.user.user-tabs",
  });

  return (
    <TabsContainer>
      <TabsWrapper>
        <Tabs
          value={activeTab}
          onChange={(_, value: TabValue) => setActiveTab(value)}
        >
          {tabs.map((tab) => (
            <Tab
              component={NavLink}
              key={tab.label}
              label={t(tab.label)}
              to={tab.value}
              value={tab.value}
            />
          ))}
        </Tabs>
      </TabsWrapper>
    </TabsContainer>
  );
}

export default UserTabs;
