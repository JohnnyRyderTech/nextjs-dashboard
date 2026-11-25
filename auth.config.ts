import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    // Send users to our own login page instead of the NextAuth default page.
    signIn: '/login',
  },
  callbacks: {
    // Runs in proxy.ts before a request is completed.
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to the login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },
  },
  providers: [], // Added in auth.ts
} satisfies NextAuthConfig;
