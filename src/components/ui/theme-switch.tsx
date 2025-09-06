"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <span className="block h-6 w-6" />;

  if (resolvedTheme === "dark") {
    return (
      <button type="button" onClick={() => setTheme("light")}>
        <Sun />
      </button>
    );
  }

  if (resolvedTheme === "light") {
    return (
      <button type="button" onClick={() => setTheme("dark")}>
        <Moon />
      </button>
    );
  }
}
