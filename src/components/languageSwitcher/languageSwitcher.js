import React from "react";
import { useTranslation } from "react-i18next";
import { IconButton } from "@mui/material";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div style={{ position: "fixed", bottom: 16, right: 16, zIndex: 10 }}>
      <div style={{ display: "flex", flexDirection: "row", gap: "8px" }}>
        <IconButton
          onClick={() => changeLanguage("en")}
          aria-label="English"
          style={{
            backgroundColor: i18n.language === "en" ? "#6a1b9a" : "transparent",
            color: i18n.language === "en" ? "#fff" : "#6a1b9a",
            borderRadius: "8px", // To make it look more boxy
            padding: "8px", // To increase the size
          }}
        >
          en
        </IconButton>
        <IconButton
          onClick={() => changeLanguage("de")}
          aria-label="German"
          style={{
            backgroundColor: i18n.language === "de" ? "#6a1b9a" : "transparent",
            color: i18n.language === "de" ? "#fff" : "#6a1b9a",
            borderRadius: "8px", // To make it look more boxy
            padding: "8px", // To increase the size
          }}
        >
          de
        </IconButton>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
