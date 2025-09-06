import { NextResponse } from "next/server";
// The client you created from the Server-Side Auth instructions
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  // if "next" is in param, use it as the redirect URL
  let next = searchParams.get("next") ?? "/";
  if (!next.startsWith("/")) {
    // if "next" is not a relative URL, use the default
    next = "/";
  }

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      const forwardedHost = request.headers.get("x-forwarded-host"); // original origin before load balancer
      const isLocalEnv = process.env.NODE_ENV === "development";
      console.log("[Auth Callback Route] forwardedHost resolved to", forwardedHost);
      console.log("[Auth Callback Route] Environment:", isLocalEnv ? "DEV" : "PROD");

      if (isLocalEnv) {
        // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
        console.log(
          "[Auth Callback Route] Local environment detected. Redirecting to",
          `${origin}${next}`
        );
        return NextResponse.redirect(`${origin}${next}`);
      }
      if (forwardedHost) {
        console.log(
          "[Auth Callback Route] Forwarded host is truthy. Redirecting to",
          `https://${forwardedHost}${next}`
        );
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      }

      console.log(
        "[Auth Callback Route] No local environment detected and forwardedHost was falsy. Redirecting to",
        `${origin}${next}`
      );
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
