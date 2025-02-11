import { compare } from "bcryptjs";
import { eq } from "drizzle-orm";
import NextAuth, { User } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";

import { db } from "@/database/dirzzle";
import { UserRole, users } from "@/database/schema";
export const { handlers, signIn, signOut, auth } = NextAuth({
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialProvider({
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }
                const [user] = await db
                    .select()
                    .from(users)
                    .where(eq(users.email, credentials?.email?.toString()));

                if (!user) {
                    return null;
                }

                const isPasswordCorrect = await compare(
                    credentials?.password.toString(),
                    user.password,
                );
                if (!isPasswordCorrect) {
                    return null;
                }

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role,
                } as User;
            },
        }),
    ],
    pages: {
        signIn: `${process.env.NEXT_PUBLIC_ENDPOINT}/sign-in`,
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            if (token.id) {
                session = {
                    ...session,
                    user: {
                        ...session.user,
                        id: token.id.toString(),
                        name: token.name as string,
                        role: token.role as UserRole,
                    },
                };
            }
            return session;
        },
    },
});
