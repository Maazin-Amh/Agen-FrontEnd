import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(request) {
    const url = request.nextUrl.pathname;
    const role = request.nextauth?.token?.role;

    // ⛔ Jika user adalah customer dan mencoba ke halaman admin
    if (role === "customer" && url.startsWith("/dashboard/admin")) {
      return NextResponse.redirect(new URL("/dashboard/customer", request.url));
    }

    return NextResponse.next(); // ✅ Admin bebas masuk ke mana saja
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // hanya jika ada token
    },
    pages: {
      signIn: "/login",
    },
  }
);

// ⛳ Aktifkan middleware di semua rute dashboard
export const config = {
  matcher: ["/dashboard/:path*"],
};