import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

// Protects the dashboard. Next.js 16 renamed middleware.ts to proxy.ts
// (the course calls this file middleware.ts).
export default NextAuth(authConfig).auth;

export const config = {
  // https://nextjs.org/docs/app/api-reference/file-conventions/proxy#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
