import { NextApiRequest, NextApiResponse } from "next";
import CredentialsProvider from "next-auth/providers/credentials";
import SignUp from "api-helper/model/signUpData";

import NextAuth from "next-auth";
import { compare } from "bcryptjs";
import { connectToDataBase } from "utils/dbConnection";

if (!process.env.NEXTAUTH_SECRET) {
    throw new Error("Please provide process.env.NEXTAUTH_SECRET");
}

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            id: "credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                console.log(credentials)
                await connectToDataBase().catch(err => { throw new Error(err) })

                const user = await SignUp.findOne({
                    email: credentials?.email
                }).select("+password")

                if (!user) {
                    throw new Error("Invalid cred")
                }

                const isPasswordCorrect = await compare(credentials.password, user.password)

                if (!isPasswordCorrect) {
                    throw new Error("Invalid credentials")
                }

                return user
            }
        })
    ],
    pages: {
        signIn: "/login",
    },
    session: {
        strategy: "jwt"
    },
    callbacks: {
        async jwt({ token, user }) {
            /* Step 1: update the token based on the user object */
            if (user) {
                token.access = user.access;
            }
            return token;
        },
        session({ session, token }) {
            /* Step 2: update the session.user based on the token object */
            if (token && session.user) {
                session.user.access = token.access;
            }
            return session;
        },
    },
});

// export default NextAuth(options);





// async authorize(credentials) {
//     if (!credentials) {
//         throw new Error("No credentials.");
//     }
//     const { email, password } = credentials;
//     return userService.signInCredentials(email, password);
// },
// }),
// ],