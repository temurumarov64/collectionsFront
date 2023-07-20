import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import data from "./languages/de.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, 
    },
    resources: {
      en: {
        translation: {
          nav: {
            about: "About",
            profile: "Profile",
            logout: "Logout",
            login: "Log in",
            search: "Search",
          },
          pages: {
            home: "Recently added items",
            home2: "Biggest collections by items",
            about:
              "Why Sammel? Google this word in German, and it will be very simple. From the dawn of history, people love to collect things, collect experiences. That is what shapes us: our memory, our experiences, our interests. The motto, the mantra of our project- be yourself here. We want you to stay on your brilliant side. Sammel is a simple web application that enables you to manage your personal collections! We all love to collect something, and sometimes we want to share our hobby with others, sometimes we do it professionally as some winemakers in France. In any scenario, collections management is a great tool to organize yourself. This project is designed specifically as a part of my internship in Itransition. I have a sincere goal to work in this company and grow as a world level software engineer. Let this project be the start of my great journey! I hope this project will be interesting and useful for you, dear guest.",
            about1: "About this project",
            about2:
              "Welcome to our cozy little wonderland, where you can be yourself!",
            profile: "Welcome to your profile",
            profile1: "Add collection",
          },
        },
      },
      de: data,
    },
  });

export default i18n;
