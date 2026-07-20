import { NextRequest, NextResponse } from "next/server";
import * as cookie from "cookie";


export function middleware(req: NextRequest) {
  const cookies = cookie.parse(req.headers.get("Cookie") || "");
  const token = cookies.token;
  const tokenFromOauth = req.cookies.get("token");
  const tokenData = req.cookies.get("s_user");

  // console.log({
  //   tokenData, token, tokenFromOauth
  // })

  // console.log("inside middleware")


  if (req.nextUrl.pathname.startsWith("/oauth")) {
    const oAuthToken = req.nextUrl.searchParams.get("token") || "";
    const user = req.nextUrl.searchParams.get("s_user") || "";
    // console.log(oAuthToken)
    // console.log(user)

    if (oAuthToken.length > 0) {
      //   const response = NextResponse.next();
      const response = NextResponse.redirect(new URL("/home", req.url));

      response.cookies.set({
        name: "token",
        value: oAuthToken.toString(),
        maxAge: 60 * 60 * 24 * 6,
        httpOnly: true,
        secure: req.nextUrl.protocol === "https:",
        sameSite: "lax",
        path: "/",
      });

      response.cookies.set({
        name: "s_user",
        value: user.toString(),
        maxAge: 60 * 60 * 24 * 6,
        httpOnly: true,
        secure: req.nextUrl.protocol === "https:",
        sameSite: "lax",
        path: "/",
      });

      response.headers.set("Cache-Control", "no-store");
      response.headers.set("Referrer-Policy", "no-referrer");

      return response;
    }
  }


  if (req.nextUrl.pathname.startsWith("/auth/signout")) {

    const response = NextResponse.redirect(new URL('/auth/signin', req.url))

    response.cookies.delete("token");
    response.cookies.delete("s_user");

    return response;
  }

  // Decode the token if available
  // if (token) {
  //   tokenData = parseJwt(token.toString());
  //   // console.log("token: ", tokenData);
  // } else if (tokenFromOauth) {
  //   tokenData = parseJwt(tokenFromOauth.value.toString());
  //   // console.log("Oauth: ", tokenData);
  // }

  // Redirect to sign-in page if token is invalid or expired
  // Check token validity and expiration
  // const isValidToken = tokenData && tokenData?.exp > Date.now() / 1000;

  // if (
  //   tokenData &&
  //   !isValidToken &&
  //   !req.nextUrl.pathname.startsWith("/auth/signin")
  // ) {
  //   console.log("Unauthorized access, redirecting to sign-in page");
  //   return NextResponse.redirect(new URL("/auth/signin", req.url));
  // }

  // // Example: Check if the user has access to a specific route
  // if (
  //   Object.keys(tokenData).length!=0 &&
  //   tokenData?.role !== "INSTRUCTOR" &&
  //   !req.nextUrl.pathname.startsWith("/unauthorized")
  // ) {
  //   console.log("Unauthorized access, user does not have instructor role");
  //   return NextResponse.redirect(new URL("/auth/signout", req.url));
  // }

  if (
    (!token &&
      !tokenFromOauth ||
      !tokenData) &&
      !(req.nextUrl.pathname.length==1)&&
    !req.nextUrl.pathname.startsWith("/auth") &&
    !req.nextUrl.pathname.startsWith("/pricing") 
  ) {
    // console.log("cant enter homepage ");
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }



  if ((token || tokenFromOauth) && Object.keys(tokenData || {}).length != 0 && req.nextUrl.pathname.startsWith("/auth")) {
    // console.log("cant enter homepage ");
    return NextResponse.redirect(new URL("/home", req.url));
  }

  // console.log("return middleware: ",req.nextUrl.href)
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
