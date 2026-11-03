import { useDispatch, useSelector } from "react-redux";

export const useLanguage = () => {
  const language = useSelector((state) => state.language);
  const dispatch = useDispatch();
  const setLanguage = (lang) => dispatch({ type: "CHANGE_LANGUAGE", payload: lang });
  const toggleLanguage = () => setLanguage(language === "pt" ? "en" : "pt");
  return { language, setLanguage, toggleLanguage };
};
