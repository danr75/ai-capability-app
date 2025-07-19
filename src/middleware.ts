import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"
import { env } from "./lib/env"

export default withAuth(
  function middleware(req) {
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // If there's a token, the user is authenticated
        return !!token
      },
    },
    pages: {
      signIn: "/auth/signin",
      error: "/auth/signin",
    },
    secret: env.NEXTAUTH_SECRET,
  }
)

// Match all protected routes
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|auth/|$).*)",
  ],
}
