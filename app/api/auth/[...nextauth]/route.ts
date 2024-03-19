import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
// import User from "@models/user";
import prisma from "../../../libs/prismadb";
import bcrypt from "bcrypt";

// import { connectToDB } from "@utils/database";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),

    // Credentials authentication provider configuration
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },

      // Function to handle the credentials authentication
      async authorize(credentials) {
        // Check if email and password are present in the credentials
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        // Find the user based on the provided email
        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.email as string,
          },
        });

        // If the user is not found or the user has no hashed password, throw an error
        if (!user || !user?.hashedPassword) {
          throw new Error("Invalid Password or user");
        }

        // Compare the provided password with the hashed password in the database
        const isCorrectPassword = await bcrypt.compare(
          credentials?.password,
          user.hashedPassword
        );

        // if email already exist, throw an error
        // if (user) {
        //   throw new Error("Email already taken");
        // }

        // If the password does not match, throw an error
        if (!isCorrectPassword) {
          throw new Error("Invalid credentials");
        }

        // If the password matches, return the user
        return user;
      },
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await prisma.user.findUnique({
        where: {
          email: session?.user?.email as string,
        },
      });

      // Update user id
      // session?.id = sessionUser?.id.toString();
      // console.log(session);

      return session;
    },

    async signIn({ account, profile, user, credentials }) {
      try {
        if (account?.provider === "google") {
          //  check if user already exists
          const userExists = await prisma.user.findUnique({
            where: {
              email: profile?.email,
            },
          });

          // if not, create a new document and save user in MongoDB
          if (!userExists) {
            const generatedPassword =
              Math.random().toString(36).slice(-8) +
              Math.random().toString(36).slice(-8);
            await prisma.user.create({
              data: {
                email: profile?.email,
                name: profile?.name,
                hashedPassword: bcrypt.hashSync(generatedPassword, 10),
                image: profile?.image,
              },
            });
          }
        }

        return true; // Do different verification for other providers that don't have `email_verified`
      } catch (error) {
        console.log(`Error checking if user exists: ${error}`);
        return false;
      }
    },
    // async signUp(req, res) {
    //   const { username, email, password } = req.body;
    //   const newUser = new User({ username, email, password });
    //   try {
    //     await newUser.save();
    //     res.status(201).json("User created successfully");
    //   } catch (error) {
    //     next(error);
    //   }
    // },
  },
});

export { handler as GET, handler as POST };
