import NextAuth from "next-auth"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "./lib/db"
import Yandex from "next-auth/providers/yandex"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Yandex],
  adapter: MongoDBAdapter(clientPromise),
})