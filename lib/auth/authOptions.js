import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db/prisma";

/**
 * NextAuth configuration for the admin dashboard.
 *
 * - Single provider: email + password, checked against the `AdminUser`
 *   table (hashed with bcrypt). There is no public sign-up route — admin
 *   accounts are created via the seed script only.
 * - JWT session strategy: the session is a signed cookie, not a DB-backed
 *   session row. This means `middleware.js` can check auth on every
 *   request to /admin/* without hitting the database.
 */
export const authOptions = {
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 8, // 8 hours
  },
  pages: {
    signIn: "/admin/login",
  },
  providers: [
    CredentialsProvider({
      name: "Admin Login",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const adminUser = await prisma.adminUser.findUnique({
          where: { email: credentials.email.toLowerCase().trim() },
        });

        if (!adminUser) {
          return null;
        }

        const isValidPassword = await bcrypt.compare(
          credentials.password,
          adminUser.hashedPassword
        );

        if (!isValidPassword) {
          return null;
        }

        // Whatever is returned here becomes `user` in the jwt callback below.
        return {
          id: adminUser.id,
          email: adminUser.email,
          name: adminUser.name ?? adminUser.email,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
