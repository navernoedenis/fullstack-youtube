import React from "react";
import { useTranslation } from "react-i18next";

import CheckRoundedIcon from "@mui/icons-material/CheckRounded";

import MenuGroup from "components/menu-group";
import MenuGroupItem from "components/menu-group/menu-group-item";

import { useSettings } from "context";

function Appearance() {
  const { theme, setAndSaveTheme } = useSettings();
  const { t } = useTranslation("translation", { keyPrefix: "settings.theme" });

  return (
    <MenuGroup isLast>
      <MenuGroupItem
        onClick={() => setAndSaveTheme("dark")}
        icon={theme === "dark" && <CheckRoundedIcon />}
      >
        {t("dark")} {t("theme")}
      </MenuGroupItem>

      <MenuGroupItem
        onClick={() => setAndSaveTheme("light")}
        icon={theme === "light" && <CheckRoundedIcon />}
      >
        {t("light")} {t("theme")}
      </MenuGroupItem>
    </MenuGroup>
  );
}

export default Appearance;
