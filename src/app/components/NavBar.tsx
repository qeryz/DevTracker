"use client";

import { usePathname } from "next/navigation";
import { DefaultAvatar, LogoutButton } from "./index";

export const Navbar = () => {
  const pathname = usePathname();

  if (pathname === "/login") return null;

  return (
    <nav className="w-full px-4 py-2 bg-gray-50 flex items-center justify-between z-50 sticky top-0 border-b border-gray-300">
      <div className="text-xl font-bold">DevBoard</div>
      <div className="flex items-center gap-4">
        <span className="relative group">
          <DefaultAvatar width={20} height={20} />
        </span>
        <LogoutButton />
      </div>
    </nav>
  );
};
