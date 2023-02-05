import React from "react";
import { useTranslation } from "react-i18next";

import MenuGroup from "components/menu-group";
import MenuGroupItem from "components/menu-group/menu-group-item";

import CheckRoundedIcon from "@mui/icons-material/CheckRounded";

import { languages } from "i18n/config";

function Language() {
  const { i18n } = useTranslation();

  return (
    <MenuGroup isLast>
      {Object.entries(languages).map(([code, lang]) => (
        <MenuGroupItem
          key={lang}
          onClick={() => i18n.changeLanguage(code)}
          icon={i18n.language === code && <CheckRoundedIcon />}
        >
          {lang}
        </MenuGroupItem>
      ))}
    </MenuGroup>
  );
}

export default Language;
