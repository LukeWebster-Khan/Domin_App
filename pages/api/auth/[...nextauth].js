import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const options = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  secret: process.env.NEXT_PUBLIC_SECRET,
  session: {
    jwt: true,
  },
  callbacks: {
    async session({ session, token, user }) {
      session.jwt = token.jwt;
      session.id = token.id;
      return session;
    },
    async jwt({ token, user, account }) {
      if (user) {
        //prettier-ignore
        const response = await fetch
(`${process.env.NEXTAUTH_URL}/api/auth/google/callback?access_token=${account?.access_token}`);
        const data = await response.text();
        token.jwt = data.jwt;
        token.id = data.id;
      }
      return token;
    },
  },
};

const Auth = (req, res) => NextAuth(req, res, options);

export default Auth;
