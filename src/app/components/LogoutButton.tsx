"use client";

import { useAuth } from "@/app/context/AuthProvider";
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";
export const LogoutButton = () => {
  const { logout } = useAuth();

  return (
    <button
      onClick={logout}
      className="hover:bg-gray-100 w-full flex items-center justify-left text-gray-700 hover:cursor-pointer"
    >
      <ArrowRightStartOnRectangleIcon className="h-5 w-5 mr-3 text-black" />
      Logout
    </button>
  );
};
