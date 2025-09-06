"use client";

import { useTheme } from "next-themes";
import { Toaster } from "sonner";
import { useMediaQuery } from "@/hooks/use-media-query";

const desktop = "(min-width: 768px)";

export default function ToasterWrapper() {
  const isDesktop = useMediaQuery(desktop);
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme as "dark" | "light";

  return (
    <Toaster
      theme={theme ?? "system"}
      position={isDesktop ? "bottom-right" : "top-center"}
      richColors={true}
    />
  );
}
