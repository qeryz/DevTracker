"use client";

import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/api/axiosInstance";

export const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // Clear cookies for access and refresh tokens
      document.cookie = "access=; path=/; max-age=0; SameSite=Strict;";
      document.cookie = "refresh=; path=/; max-age=0; SameSite=Strict;";

      // Redirect to the login page
      router.push("/login");
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="text-sm text-red-500 hover:underline"
    >
      Logout
    </button>
  );
};
