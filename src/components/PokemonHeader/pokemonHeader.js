import React, { useState } from "react";
import {
  HeaderContainer,
  Title,
  ControlContainer,
  StyledFormControl,
  StyledTextField,
} from "./pokemonHeaderStyles";
import { Select, MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";

const PokemonHeader = ({ limit, onLimitChange, onSearchChange }) => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    onSearchChange(event);
  };

  const menuItemOptions = [5, 10, 50];

  return (
    <HeaderContainer>
      <Title variant="h4">{t("ChooseYourPokemon")}</Title>
      <ControlContainer>
        <StyledFormControl variant="outlined">
          <Select value={limit} onChange={onLimitChange} displayEmpty>
            {menuItemOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {t("itemPerPage", { count: option })}
              </MenuItem>
            ))}
          </Select>
        </StyledFormControl>
        <StyledTextField
          variant="outlined"
          placeholder={t("SearchByName")}
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </ControlContainer>
    </HeaderContainer>
  );
};

export default PokemonHeader;
