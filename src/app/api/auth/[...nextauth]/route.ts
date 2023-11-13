import NextAuth from 'next-auth';
import Auth0Provider from 'next-auth/providers/auth0';

const handler = NextAuth({
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID as string,
      clientSecret: process.env.AUTH0_CLIENT_SECRET as string,
      issuer: process.env.AUTH0_ISSUER,
      token: {
        params: {
          audience: process.env.AUTH0_AUDIENCE,
        },
      },
      authorization: {
        params: {
          audience: encodeURI(process.env.AUTH0_AUDIENCE as string),
          scope: 'openid profile email read:products',
        },
      },
      idToken: true,
    }),
  ],
  callbacks: {
    session: async ({ session, token }) => {
      if (token) {
        session.user = session.user;
        session.accessToken = token.accessToken;
        session.error = token.error;
      }
      return session;
    },
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
      }

      return token;
    },
  },
});

export { handler as GET, handler as POST };
