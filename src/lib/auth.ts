import { prismaAdapter } from "better-auth/adapters/prisma";
import { betterAuth } from "better-auth";
import { prisma } from "./prisma";
import { nextCookies } from "better-auth/next-js";
import { admin } from "better-auth/plugins";

export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    facebook: {
      enabled: true,
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_SECRET_KEY as string,
    },
  },
  plugins: [nextCookies(), admin()],
});
