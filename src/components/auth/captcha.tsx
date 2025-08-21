"use client";

import HCaptcha from "@hcaptcha/react-hcaptcha";
import { useTheme } from "next-themes";
import { toast } from "sonner";

interface CaptchaProps {
  handleCaptchaChange: (token: string) => void;
  captchaRef: React.MutableRefObject<HCaptcha | null>;
}

const siteKey = process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY as string;

export default function Captcha({ handleCaptchaChange, captchaRef }: CaptchaProps) {
  const { resolvedTheme } = useTheme();
  return (
    <HCaptcha
      sitekey={siteKey}
      onVerify={handleCaptchaChange}
      theme={resolvedTheme}
      onChalExpired={() => toast.warning("Weryfikacja hCaptcha wygasła")}
      onError={(error) =>
        toast.error(`Wystąpił błąd w trakcie weryfikacji hCaptcha: ${error}`)
      }
      ref={captchaRef}
    />
  );
}
