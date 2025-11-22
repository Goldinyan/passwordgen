"use client";
import { useEffect, useState } from "react";
import { Sun, Moon, Monitor } from "lucide-react"

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");

  useEffect(() => {
    const saved = localStorage.getItem("theme") as "light" | "dark" | "system" | null;
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
    <div className="flex  flex-row border rounded-full mt-5 border-Xborder-light  items-center dark:border-Xborder-dark">
      <Sun
        onClick={() => setTheme("light")}
        className={`${theme === "light" ? "bg-Xprimary text-black rounded-xl" : ""} h-5 p-1 text-XlightText hover:dark:text-white`}
      />
      <Monitor
        onClick={() => setTheme("system")}
        className={`${theme === "system" ? "bg-Xbg-darkGray rounded-full" : ""} h-5 p-1 text-XlightText hover:dark:text-white`}
      />
       
      <Moon
        onClick={() => setTheme("dark")}
        className={`${theme === "dark" ? "bg-Xbg-darkGray rounded-xl" : ""} h-5 p-1 text-XlightText hover:dark:text-white`}
      />
       
      
    </div>
  );
}
