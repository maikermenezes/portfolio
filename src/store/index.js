import { configureStore } from "@reduxjs/toolkit";

const STORAGE_KEY = "portfolio-language";

const getInitialLanguage = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "pt" || saved === "en") return saved;
  } catch {
    /* storage unavailable */
  }
  if (typeof navigator !== "undefined" && navigator.language) {
    return navigator.language.toLowerCase().startsWith("pt") ? "pt" : "en";
  }
  return "pt";
};

const reducerFn = (state = { language: getInitialLanguage() }, action) => {
  switch (action.type) {
    case "CHANGE_LANGUAGE":
      return { ...state, language: action.payload };
    default:
      return state;
  }
};

const store = configureStore({ reducer: reducerFn });

const applyLanguage = (language) => {
  document.documentElement.lang = language === "pt" ? "pt-BR" : "en";
  try {
    localStorage.setItem(STORAGE_KEY, language);
  } catch {
    /* storage unavailable */
  }
};

applyLanguage(store.getState().language);
store.subscribe(() => applyLanguage(store.getState().language));

export default store;
