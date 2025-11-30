import GoogleProvider from 'next-auth/providers/google';
import { NextAuthOptions } from 'next-auth';

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
        }),
    ],
    pages: {
        signIn: '/',
        signOut: '/',
        error: '/',
        verifyRequest: '/',
        newUser: '/auth-success',
    },
    callbacks: {
        async signIn({ user }) {
            return true;
        },
        async redirect({ url, baseUrl }) {
            return `${baseUrl}/auth-success`;
        },
        async session({ session }) {
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
};