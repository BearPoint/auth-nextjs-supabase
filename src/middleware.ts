import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const reqUrl = new URL(req.url);
  const res = NextResponse.next();

  const supabase = createMiddlewareClient({ req, res });
  const isLoginPage = ["/sign-in", "/sign-up"].includes(reqUrl.pathname);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (isLoginPage && session) {
    return NextResponse.redirect(reqUrl.host);
  } else if (!session && !isLoginPage) {
    return NextResponse.redirect(`http://${reqUrl.host}/sign-in`);
  }
  return res;
}
export const config = {
  matcher: [
    "/((?!api|auth/callback|images|icons|_next/static|_next/image|favicon.ico).*)"],
};
