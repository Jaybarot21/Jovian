import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Globe } from "lucide-react";
import { useTranslation } from "../lib/translations";

interface Language {
  code: string;
  name: string;
  flag: string;
}

// Only include the specified languages
const languages: Language[] = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "ar", name: "العربية", flag: "🇦🇪" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
];

const LanguageSwitcher = () => {
  const { getLanguage } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState<Language>(() => {
    const savedLanguageCode = getLanguage();
    return (
      languages.find((lang) => lang.code === savedLanguageCode) || languages[0]
    );
  });

  // Update current language when language changes in localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      const savedLanguageCode = getLanguage();
      const newLanguage =
        languages.find((lang) => lang.code === savedLanguageCode) ||
        languages[0];
      setCurrentLanguage(newLanguage);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [getLanguage]);

  const handleLanguageChange = (language: Language) => {
    setCurrentLanguage(language);
    // Set language in localStorage for persistence
    localStorage.setItem("preferredLanguage", language.code);
    // Dispatch storage event to notify other components
    window.dispatchEvent(new Event("storage"));
    // Force page reload to apply translations everywhere
    window.location.reload();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-1 border-green-200 text-green-700 hover:bg-green-50 hover:text-green-800"
        >
          <Globe className="h-4 w-4 mr-1" />
          <span className="mr-1">{currentLanguage.flag}</span>
          <span className="hidden sm:inline">{currentLanguage.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-48 max-h-[300px] overflow-y-auto"
      >
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language)}
            className={`flex items-center gap-2 cursor-pointer ${currentLanguage.code === language.code ? "bg-green-50 text-green-700 font-medium" : ""}`}
          >
            <span className="text-base mr-1">{language.flag}</span>
            <span>{language.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
