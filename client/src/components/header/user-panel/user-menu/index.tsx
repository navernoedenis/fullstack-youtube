import React, { useState, MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import AdminSettingsIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import ExitToAppIcon from "@mui/icons-material/ExitToAppOutlined";
import FeedbackIcon from "@mui/icons-material/FeedbackOutlined";
import HelpIcon from "@mui/icons-material/HelpOutlineOutlined";
import MoonIcon from "@mui/icons-material/Brightness3Outlined";
import PersonIcon from "@mui/icons-material/PersonOutlined";
import SettingsIcon from "@mui/icons-material/SettingsOutlined";
import TranslateIcon from "@mui/icons-material/TranslateOutlined";

import MenuGroup from "components/menu-group";
import MenuGroupItem from "components/menu-group/menu-group-item";

import LocalStorageService from "services/local-storage";

import { languages, Language } from "i18n/config";

import { useAuth, useSettings } from "context";
import { isAdminRole } from "helpers/roles";
import { SubmenuType } from "./submenu/types";

import Submenu from "./submenu";
import UserInfo from "./user-info";

import { UserMenuContainer } from "./styles";

function UserMenu() {
  const navigate = useNavigate();

  const { me, setMe } = useAuth();
  const { theme } = useSettings();
  const { t, i18n } = useTranslation();

  const [submenu, setSubmenu] = useState<SubmenuType | null>(null);

  const handleLogout = () => {
    LocalStorageService.remove("accessToken");
    setMe(null);
    window.location.href = "/";
  };

  const handleOpenSubmenu = (
    event: MouseEvent<HTMLDivElement>,
    submenu: SubmenuType
  ) => {
    event.stopPropagation();
    setSubmenu(submenu);
  };

  const handleCloseSubmenu = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    setSubmenu(null);
  };

  const userMenuPrefix = "components.header.user-menu";

  const isAdmin = isAdminRole(me?.roles || []);

  if (submenu) {
    return (
      <UserMenuContainer>
        <Submenu
          onClose={handleCloseSubmenu}
          title={t(`${userMenuPrefix}.${submenu}`)}
          type={submenu}
        />
      </UserMenuContainer>
    );
  }

  return (
    <UserMenuContainer>
      {me && (
        <>
          <UserInfo me={me} />
          <MenuGroup>
            {isAdmin && (
              <MenuGroupItem
                onClick={() => navigate(`/admin`)}
                icon={<AdminSettingsIcon />}
              >
                {t(`${userMenuPrefix}.admin`)}
              </MenuGroupItem>
            )}

            <MenuGroupItem
              onClick={() => navigate(`/user/${me.profile.username}`)}
              icon={<PersonIcon />}
            >
              {t(`${userMenuPrefix}.your_channel`)}
            </MenuGroupItem>
            <MenuGroupItem onClick={handleLogout} icon={<ExitToAppIcon />}>
              {t(`${userMenuPrefix}.sign_out`)}
            </MenuGroupItem>
          </MenuGroup>
        </>
      )}

      <MenuGroup>
        <MenuGroupItem
          onClick={(event) => handleOpenSubmenu(event, "appearance")}
          icon={<MoonIcon />}
          subMenuIcon
        >
          {t(`${userMenuPrefix}.appearance`)}: {t(`settings.theme.${theme}`)}
        </MenuGroupItem>
        <MenuGroupItem
          onClick={(event) => handleOpenSubmenu(event, "language")}
          icon={<TranslateIcon />}
          subMenuIcon
        >
          {t(`${userMenuPrefix}.language`)}:{" "}
          {languages[i18n.language as Language]}
        </MenuGroupItem>
      </MenuGroup>

      {me && (
        <MenuGroup>
          <MenuGroupItem
            onClick={() => console.log("settings item")}
            icon={<SettingsIcon />}
          >
            {t(`${userMenuPrefix}.settings`)}
          </MenuGroupItem>
        </MenuGroup>
      )}

      <MenuGroup isLast>
        <MenuGroupItem
          onClick={() => console.log("help item")}
          icon={<HelpIcon />}
        >
          {t(`${userMenuPrefix}.help`)}
        </MenuGroupItem>
        <MenuGroupItem
          onClick={() => console.log("send feedback item")}
          icon={<FeedbackIcon />}
        >
          {t(`${userMenuPrefix}.send_feedback`)}
        </MenuGroupItem>
      </MenuGroup>
    </UserMenuContainer>
  );
}

export default UserMenu;
