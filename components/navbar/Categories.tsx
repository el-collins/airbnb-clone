'use client'
// Import necessary modules and dependencies
import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import Container from "../Container";
import { GiBarn, GiBoatFishing, GiCactus, GiCastle, GiCaveEntrance, GiForestCamp, GiIsland, GiWindmill } from "react-icons/gi";
import { MdOutlineVilla } from "react-icons/md";
import CategoryBox from "../CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";
import { FaSkiing } from "react-icons/fa";
import { BsSnow } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";


// Define the categories array for the different categories available
const categories = [
  // Beach category
  {
    label: "Beach",
    icon: TbBeach,
    descrition: "This property is close to the beach",
  },
  // Windmills category
  {
    label: "Windmills",
    icon: GiWindmill,
    descrition: "This property has windmill",
  },
  // Modern category
  {
    label: "Modern",
    icon: MdOutlineVilla,
    descrition: "This property is modern",
  },
  {
    label: "Countryside",
    icon: TbMountain,
    descrition: "This property is in the countryside",
  },
  {
    label: "Pool",
    icon: TbPool,
    descrition: "This property has a pool",
  },
  {
    label: "Lake",
    icon: GiBoatFishing,
    descrition: "This property is close to a lake",
  },
  {
    label: "Skiing",
    icon: FaSkiing,
    descrition: "This property has skilling activitites",
  },
  {
    label: "Castles",
    icon: GiCastle,
    descrition: "This property is in castle",
  },
  {
    label: "Campling",
    icon: GiForestCamp,
    descrition: "This property has camping activitites",
  },
  {
    label: "Arctic",
    icon: BsSnow,
    descrition: "This property has camping activitites",
  },
  {
    label: "Cave",
    icon: GiCaveEntrance,
    descrition: "This property is in a cave",
  },
  {
    label: "Desert",
    icon: GiCactus,
    descrition: "This property is in the desert",
  },
  {
    label: "Barns",
    icon: GiBarn,
    descrition: "This property is in the barn",
  },
  {
    label: "Lux",
    icon: IoDiamond,
    descrition: "This property is luxurious",
  },
];

// Categories component definition
const Categories = () => {
  // Initialize the pathname and search parameters
  const pathname = usePathname();
  const params = useSearchParams();

  // Function to check if the component is rendered on the main page
  const isMainPage = pathname === "/";

  // Return the JSX for the Categories component
  return (
    <Container>
      {/* Render the category boxes only if the component is rendered on the main page */}
      {isMainPage && (
        <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
          {categories.map((item) => (
            <CategoryBox
              key={item.label}
              label={item.label}
              icon={item.icon}
              selected={params?.get("category") === item.label}
            />
          ))}
        </div>
      )}
    </Container>
  );
};

// Export the Categories component for use in other parts of the application
export default Categories;