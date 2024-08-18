import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createUser, getUser } from "./data-service";

const authConfig = {
  providers: [
    Google({
      clientId:
        "126591977385-7t43gti0vep5rhr8traljar8unln1aoe.apps.googleusercontent.com",
      clientSecret: "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",
    }),
  ],
  callbacks: {
    authorized({ auth, request }: any) {
      //this gets called when ever user visit cart page 1st arg is current seesion so if user is already sign in then only user can access the route else not
      return !!auth?.user; //trick to convert any value to boolean
    },
    async signIn({ user, account, profile }: any) {
      //this callback get called before signin process starts and signIn process starts when we return true from this function
      try {
        const existingUser = await getUser(user.email);

        if (!existingUser)
          await createUser({ email: user.email, fullName: user.name });

        return true;
      } catch {
        return false;
      }
    },
    async session({ session }: any) {
      //this will execute each time signIn callback executes we storing user id so we can update cart as per user
      const User = await getUser(session.user.email);
      session.user.id = User.id;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};
export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
