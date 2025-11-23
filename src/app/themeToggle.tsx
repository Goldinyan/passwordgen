"use client";
import { useEffect, useState } from "react";
import { Sun, Moon, Monitor } from "lucide-react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");

  useEffect(() => {
    const saved = localStorage.getItem("theme") as
      | "light"
      | "dark"
      | "system"
      | null;
    if (saved) {
      setTheme(saved);
    } else {
      setTheme("system");
    }
  }, []);

  useEffect(() => {
    let isDark = false;

    if (theme === "system") {
      isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    } else {
      isDark = theme === "dark";
    }

    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="flex gap-0.5 flex-row ring rounded-full  ring-Xborder-light  items-center dark:ring-Xborder-dark">
      <div
        onClick={() => setTheme("light")}
        className={`${
          theme === "light" ? "ring bg-white text-black ring-Xborder-light rounded-full" : "text-XlightText"
        } p-1 `}
      >
        <Sun className="h-6 w-6  hover:dark:text-white hover:text-black transition-all" />
      </div>

      <div
        onClick={() => setTheme("system")}
        className={`${
          theme === "system" ? "ring ring-Xborder-light dark:ring-Xborder-dark rounded-full" : ""
        } p-1`}
      >
        <Monitor className="h-6 w-6 text-XlightText hover:dark:text-white hover:text-black transition-all" />
      </div>

      <div
        onClick={() => setTheme("dark")}
        className={`${
          theme === "dark" ? "ring ring-Xborder-dark rounded-full" : ""
        } p-1`}
      >
        <Moon className="h-6 w-6 text-XlightText hover:dark:text-white hover:text-black" />
      </div>
    </div>
  );
}
