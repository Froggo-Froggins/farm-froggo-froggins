import NextAuth, { NextAuthOptions } from 'next-auth'
import Twitter from 'next-auth/providers/twitter'

export const authConfig: NextAuthOptions = {
    providers: [
        Twitter({
            clientId: process.env.TWITTER_CONSUMER_KEY!,
            clientSecret: process.env.TWITTER_CONSUMER_SECRET!,
            version:'2.0'
        })
    ]
}