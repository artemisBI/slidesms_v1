import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
    ],
    pages: {
        signIn: '/',
        signOut: '/',
        error: '/', // Error code passed in query string as ?error=
        verifyRequest: '/', // (used for check email message)
        newUser: '/auth-success' // New users will be directed here on first sign in
    },
    callbacks: {
        async signIn({ user, account, profile }) {
            // You can add custom logic here, e.g., check if user is allowed
            return true;
        },
        async redirect({ url, baseUrl }) {
            // Redirect to auth-success after successful login
            return `${baseUrl}/auth-success`;
        },
        async session({ session, token }) {
            // Add custom properties to session if needed
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
