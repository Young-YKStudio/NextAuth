import NextAuth from "next-auth"
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "../../../lib/mongodb"
import dbConnect from '../../../lib/dbConnect'
import User from '../../../model/User'
import { compare } from 'bcrypt'
import { redirect } from "next/dist/server/api-utils"

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: `${process.env.GOOGLE_CLIENT}`,
      clientSecret: `${process.env.GOOGLE_SECRET}`,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code'
        }
      }
    }),
    // ...add more providers here
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text'
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      async authorize(credentials) {
        await dbConnect();

        const user = await User.findOne({
          email: credentials?.email,
        })

        if(!user) {
          return 
        }

        const passwordMatch = await compare(
          credentials!.password,
          user.password
        )

        if(!passwordMatch) {
          throw new Error('Password do not match')
        }

        return user
      }
    })
  ],
  pages: {
    signIn: '/login',
  },
  debug: process.env.NODE_ENV === 'development',
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: 'jwt',
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT,
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async redirect({url, baseUrl}) {
      if (url.startsWith('/')) {
        return `${baseUrl}${url}`
      } else if (new URL(url).origin === baseUrl) {
        return url
      }
      return baseUrl
    }
  }
})