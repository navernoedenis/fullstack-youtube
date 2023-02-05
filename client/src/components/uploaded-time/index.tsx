import React from "react";
import { useTranslation } from "react-i18next";
import { register } from "timeago.js";
import TimeAgo from "timeago-react";

import de from "timeago.js/lib/lang/de";
import en from "timeago.js/lib/lang/en_US";
import fr from "timeago.js/lib/lang/fr";
import uk from "timeago.js/lib/lang/uk";

register("de", de);
register("en", en);
register("fr", fr);
register("uk", uk);

interface CreatedAtProps {
  date: Date;
}

function UploadedTime({ date }: CreatedAtProps) {
  const { i18n } = useTranslation();

  return (
    <TimeAgo
      datetime={date}
      locale={i18n.resolvedLanguage}
      style={{ whiteSpace: "nowrap" }}
    />
  );
}

export default UploadedTime;
