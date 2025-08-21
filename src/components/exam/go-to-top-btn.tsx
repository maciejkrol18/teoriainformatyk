"use client";

import { ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

interface GoToTopBtnProps {
  scrollThreshold: number;
}

export default function GoToTopBtn({ scrollThreshold }: GoToTopBtnProps) {
  const [scroll, setScroll] = useState<number>(0);

  const onScroll = () => {
    setScroll(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return scroll > scrollThreshold ? (
    <Button
      variant="primary"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Przejdź na samą górę"
      className="fixed bottom-4 right-4 z-50 rounded-full h-12 w-12"
    >
      <ChevronUp />
    </Button>
  ) : null;
}
