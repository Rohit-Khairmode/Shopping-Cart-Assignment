import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createUser, getUser } from "./data-service";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],
  callbacks: {
    authorized({ auth, request }: any) {
      //this gets called when ever user visit cart page 1st arg is current seesion so if user is already sign in then only user can access the route else not
      return !!auth?.user; //trick to convert any value to boolean
    },
    async signIn({ user, account, profile }: any) {
      console.log("SIGNIN STARTED");
      //this callback get called before signin process starts and signIn process starts when we return true from this function
      console.log(user, "from auth");
      try {
        const existingUser = await getUser(user.email);
        console.log(existingUser, "from auth ");
        if (!existingUser) {
          const data = await createUser({
            email: user.email,
            fullName: user.name,
          });
          console.log(data, "from auth");
        }

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
