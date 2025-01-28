import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";

interface ThemeToggleProps {
  theme: string;
  setTheme: (theme: string) => void;
}

export default function ThemeToggle({ theme, setTheme }: ThemeToggleProps) {
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="fixed bottom-0 right-0 z-50 m-4"
    >
      {theme === "light" ? (
        <Moon className="h-[1.2rem] w-[1.2rem]" />
      ) : (
        <Sun className="h-[1.2rem] w-[1.2rem]" />
      )}
    </Button>
  );
}
