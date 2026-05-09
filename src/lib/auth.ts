import type { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { config } from 'dotenv';

config({ path: '.env.local' });

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  pages: {
    signIn: "/sign-in",
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize(credentials) {
        if (
          credentials?.email === process.env.ADMIN_EMAIL &&
          credentials?.password === process.env.ADMIN_PASSWORD
        ) {
          return {
            id: "admin-user",
            email: process.env.ADMIN_EMAIL,
            name: "Admin",
          };
        }
        return null;
      },
    }),
  ],
};
