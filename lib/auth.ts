import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import connectDB from "./database";
import User from "@/models/Users";
import bcrypt from "bcryptjs";
import Google from "next-auth/providers/google";

export const { signIn, signOut, auth, handlers } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        await connectDB();
        const user = await User.findOne({ email: credentials.email });

        if (!user) {
          throw new Error("Invalid credentials");
        } else {
          const correctPassword = await bcrypt.compare(
            credentials.password as string,
            user.password as string,
          );

          if (!correctPassword) {
            throw new Error("Invalid credentials");
          }
        }
        return {
          id: user._id.toString(),
          email: user.email,
        };
      },
    }),
    Google({
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          scope: "openid email profile",
        },
      },
    }),
  ],

  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id;
      }

      return token;
    },

    session: ({ session, token }) => {
      session.user.id = token.id as string;
      return session;
    },

    //// This is just for Google provider
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        await connectDB();
        const existingUser = await User.findOne({ email: user.email });

        if (!existingUser) {
          const dbUser = await User.create({
            email: user.email,
            image: user.image,
            name: user.name,
            password: null,
            provider: "google",
          });

          user.id = dbUser._id.toString();
        }
      }
      return true;
    },
  },
});
