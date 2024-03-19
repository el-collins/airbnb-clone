// Import the PrismaClient from the Prisma package
import { PrismaClient } from "@prisma/client";

// Declare a global variable 'prisma' which can be either a PrismaClient instance or undefined
declare global {
 var prisma: PrismaClient | undefined;
}

// Initialize the 'prisma' variable. If it's not set yet, create a new PrismaClient instance
const prisma = globalThis.prisma || new PrismaClient();

// If the current environment is not production, replace the global 'prisma' variable with the current instance
if (process.env.NODE_ENV !== "production") {
 globalThis.prisma = prisma;
}

// Export the 'prisma' instance to make it available for other modules
export default prisma;