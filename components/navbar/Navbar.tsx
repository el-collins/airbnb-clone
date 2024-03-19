"use client";
import { getProviders } from "next-auth/react";
import { useState, useEffect } from "react";
import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import Categories from "./Categories";



const Navbar = () => {

  // State to store authentication providers
  const [providers, setProviders] = useState(null);

  // State to toggle the mobile dropdown menu
  const [toggleDropdown, setToggleDropdown] = useState(false);

  // useEffect hook to fetch authentication providers when the component mounts
  useEffect(() => {
    const setUpProviders = async () => {
      // Fetch authentication providers from the server
      const response: any = await getProviders();

      // Set the providers in the component state
      setProviders(response);
    };
    // Call the setup function
    setUpProviders();
  }, []);


  // console.log(providers);
  

  return (
    <div className="fiexed w-full bg-gray-50 z-10 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
            <Search />
            <UserMenu />
          </div>
        </Container>
      </div>
      <Categories/>
    </div>
  );
};

export default Navbar;
