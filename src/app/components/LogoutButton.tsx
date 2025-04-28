"use client";

import { useAuth } from "@/app/context/AuthProvider";
export const LogoutButton = () => {
  const { logout } = useAuth();

  return (
    <button onClick={logout} className="text-sm text-red-500 hover:underline">
      Logout
    </button>
  );
};
