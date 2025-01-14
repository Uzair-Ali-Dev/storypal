import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { FirestoreAdapter } from "@auth/firebase-adapter";
import { cert } from "firebase-admin/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth as fAuth } from "@/lib/firebase";
import { db as adminDb } from "@/lib/firebase-admin";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        if (!email || !password) return null;

        try {
          const userCredential = await signInWithEmailAndPassword(
            fAuth,
            email,
            password
          );

          if (userCredential.user) {
            return {
              id: userCredential.user.uid,
              email: userCredential.user.email,
              name: userCredential.user.displayName,
              image: userCredential.user.photoURL,
            };
          }

          return null;
        } catch (error) {
          console.error("Error:", error);
          return null;
        }
      },
    }),
  ],
  adapter: FirestoreAdapter({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
    }),
  }),
  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token }) {
      if (token.sub) {
        // Fetch user profile data from Firestore
        const userDoc = await adminDb.collection("users").doc(token.sub).get();
        const userData = userDoc.data();

        // Add the additional fields to the token
        token.isProfileComplete = userData?.isProfileComplete ?? false;
        token.username = userData?.username ?? "";
        token.name = userData?.displayName ?? "";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!;

        session.user.isProfileComplete = token.isProfileComplete as boolean;
        session.user.username = token.username as string;
        session.user.name = token.name as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
  },
});
