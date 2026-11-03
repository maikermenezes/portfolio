import { configureStore } from "@reduxjs/toolkit";

const STORAGE_KEY = "portfolio-language";

const getInitialLanguage = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "pt" || saved === "en") return saved;
  } catch {
    /* storage unavailable */
  }
  // Portuguese is the default; visitors can switch with the PT/EN toggle (remembered above).
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
