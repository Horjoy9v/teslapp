import { Button } from "./ui/button";

interface LanguageToggleProps {
  language: string;
  setLanguage: (language: string) => void;
}

export default function LanguageToggle({
  language,
  setLanguage,
}: LanguageToggleProps) {
  return (
    <Button
      variant="outline"
      onClick={() => setLanguage(language === "en" ? "ru" : "en")}
      className="fixed bottom-4 left-4 z-50"
    >
      {language === "en" ? "RU" : "EN"}
    </Button>
  );
}
