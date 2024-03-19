'use client'
// Import necessary modules and dependencies
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { IconType } from "react-icons";
import qs from "query-string";

// Define the CategoryBoxProps interface for the component's props
interface CategoryBoxProps {
  // Icon to be displayed
  icon: IconType;
  // Label for the category box
  label: string;
  // Indicates whether the category box is selected or not
  selected?: boolean;
}

// CategoryBox component definition
const CategoryBox: React.FC<CategoryBoxProps> = ({
  // Destructure the icon, label, and selected props
  icon: Icon,
  label,
  selected,
}) => {
  // Initialize the router and search parameters
  const router = useRouter();
  const params = useSearchParams();

  // Define the handleClick callback function for handling category box clicks
  const handleClick = useCallback(() => {
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    // Create an updated query object with the new category value
    const updatedQuery: any = {
      ...currentQuery,
      category: label,
    };

    // If the current category is the same as the clicked category, remove the category from the query
    if (params?.get("category") === label) {
      delete updatedQuery.category;
    }

    // Generate the new URL with the updated query parameters
    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    // Navigate to the new URL
    router.push(url);
  }, [label, params, router]);

  // Return the JSX for the CategoryBox component
  return (
    <div
      // Attach the onClick event handler to the category box
      onClick={handleClick}
      // Style the category box based on the selected prop
      className={`flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-800 transition cursor-pointer ${
        selected ? "border-b-neutral-800" : "border-transparent"
      } ${selected ? "text-neutral-800" : "text-neutral-500"}`}
    >
      {/* Render the icon and label for the category box */}
      <Icon size={26} />
      <div className="font-medium text-sm">{label}</div>
    </div>
  );
};

// Export the CategoryBox component for use in other parts of the application
export default CategoryBox;