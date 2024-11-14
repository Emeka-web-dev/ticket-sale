import { db } from "@/lib/db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { UserRole } from "@prisma/client";
import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { getTwoFactorConfirmationByUserId } from "./data/two-factor-confirmation";
import { getUserById } from "./data/user";

export const { handlers, auth, signIn, signOut } = NextAuth({
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true;

      if (!user.id) return false;
      const existingUser = await getUserById(user.id);
      if (!existingUser?.emailVerified) return false;
      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
          existingUser.id
        );

        if (!twoFactorConfirmation) return false;

        // Delete two factor confirmation for next sign in
        await db.twoFactorComfirmation.delete({
          where: { id: twoFactorConfirmation.id },
        });
      }
      const expiration = Math.floor(Date.now() / 1000) + 12 * 60 * 60;
      user.customExpiration = expiration;
      return true;
    },
    async jwt({ user, token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      token.role = existingUser.role;
      if (user?.customExpiration) {
        token.expiration = user.customExpiration;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
        session.user.customExpiration = token?.expiration as number;
      }
      return session;
    },
  },
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },

  ...authConfig,
});
