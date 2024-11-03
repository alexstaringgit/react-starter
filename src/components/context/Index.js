import { createContext } from "react";
import lang from "./lang/Index";

export const language = lang;
export const languageContext = createContext(language.en);
