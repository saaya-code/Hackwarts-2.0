import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Google({ allowDangerousEmailAccountLinking: true })],
  trustHost: true,
  pages: {
    signIn: "/register",
    error: "/register",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn() {
      return true;
    },
    async session({ session, token }) {
      return { ...session, user: { ...session.user, id: token.sub } };
    },
  },
});
