import React, { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import SearchIcon from "@mui/icons-material/SearchRounded";
import CloseIcon from "@mui/icons-material/CloseRounded";

import {
  Buttons,
  ClearButton,
  Input,
  SearchButton,
  SearchContainer,
} from "./styles";

function SearchPanel() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const isQueryExist = Boolean(query.trim());

  const { t } = useTranslation("translation", {
    keyPrefix: "components.header.search",
  });

  const handleSubmit = (event: FormEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (!isQueryExist) return;
    navigate(`/result?search=${encodeURI(query)}`);
  };

  const handleClear = () => {
    setQuery("");
  };

  return (
    <SearchContainer component="form" onSubmit={handleSubmit}>
      <Input
        name="search"
        onChange={(event) => setQuery(event.target.value)}
        placeholder={`${t("placeholder")}`}
        type="text"
        value={query}
      />

      <Buttons>
        {isQueryExist && (
          <ClearButton onClick={handleClear} type="button">
            <CloseIcon />
          </ClearButton>
        )}

        <SearchButton type="submit" disableRipple>
          <SearchIcon />
        </SearchButton>
      </Buttons>
    </SearchContainer>
  );
}

export default SearchPanel;
