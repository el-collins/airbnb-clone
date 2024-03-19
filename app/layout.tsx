// Import necessary modules
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/navbar/Navbar";
import RegisterModal from "../components/modals/RegisterModal";

// Import ToasterProvider for displaying toasts
import ToasterProvider from "./providers/ToasterProvider";
import LoginModal from "../components/modals/LoginModal";
// Import getCurrentUser for getting the current user
// import getCurrentUser from "./actions/getCurrentUser";
import SessionWrapper from "../components/SessionWrapper";

// Define the metadata for the app
export const metadata: Metadata = {
  title: "Airbnb",
  description: "Airbnb clone app",
};

// Define the RootLayout component
export default async function RootLayout({
  children, // The child components to be rendered
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const currentUser = await getCurrentUser() // Get the current user

  return (
    // Wrap the components with SessionWrapper to handle authentication
    <SessionWrapper>
      <html lang="en">
        <body >
          {/* ClientOnly is used to ensure that components inside it are rendered only on the client side */}
          {/* <ClientOnly> */}
            {/* Import ToasterProvider to provide toasts for the app */}
            <ToasterProvider/>
            {/* Import LoginModal and RegisterModal for user authentication */}
            <LoginModal />
            <RegisterModal />
            {/* Import Navbar for the main navigation */}
            <Navbar/>
          {/* </ClientOnly> */}
          {children} {/* Render the child components */}
        </body>
      </html>
    </SessionWrapper>
  );
}