/**
 * Example of setting up language translation and putting it in context
 */
import { createContext } from "react";
import { Platform, NativeModules } from "react-native";

// Components
import ExampleMain from "./ExampleMain";

// Language
import { translations } from "./_language";

// Context
const LanguageContext = createContext(null);

export default function App() {
  // Device language
  const deviceLanguage =
    Platform.OS === "ios"
      ? NativeModules.SettingsManager.settings.AppleLocale ||
        NativeModules.SettingsManager.settings.AppleLanguages[0]
      : NativeModules.I18nManager.localeIdentifier;

  // Set the language information and put it in context
  const languageTranslation = translations[deviceLanguage]
    ? translations[deviceLanguage]
    : translations[deviceLanguage.split("_")[0]];

  // Fallback to English if translations don't exist
  if (languageTranslation == null) languageTranslation["en"];
  return (
    <LanguageContext.Provider value={languageTranslation}>
      <ExampleMain />
    </LanguageContext.Provider>
  );
}
