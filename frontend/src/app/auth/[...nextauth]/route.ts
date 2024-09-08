import NextAuth from 'next-auth';

export const authOptions = {
  providers: [],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    jwt: async ({ token, user }:any) => {
      if (user) {
        token.user = user;
      }
      return token;
    },
    session: async ({ session, user }:any) => {
      session.user = user;
      return session;
    },
  },
};

export default NextAuth(authOptions);