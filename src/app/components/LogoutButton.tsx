"use client";

import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = () => {
    document.cookie = "token=; path=/; max-age=0; SameSite=Strict;";
    router.push("/login");
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

export default LogoutButton;
