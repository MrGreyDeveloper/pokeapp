import React from "react";
import { useTranslation } from "react-i18next";
import { IconButton } from "@mui/material";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div style={{ position: "fixed", top: 16, right: 16, zIndex: 10 }}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <IconButton
          onClick={() => changeLanguage("en")}
          aria-label="English"
          style={{
            backgroundColor: i18n.language === "en" ? "#1976d2" : "transparent",
            color: i18n.language === "en" ? "#fff" : "#1976d2",
            marginBottom: 8,
          }}
        >
          en
        </IconButton>
        <IconButton
          onClick={() => changeLanguage("de")}
          aria-label="German"
          style={{
            backgroundColor: i18n.language === "de" ? "#1976d2" : "transparent", // Highlight if selected
            color: i18n.language === "de" ? "#fff" : "#1976d2", // Text color change based on selection
          }}
        >
          de
        </IconButton>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
