"use client";

import { usePathname } from "next/navigation";
import LogoutButton from "./LogoutButton";

const Navbar = () => {
  const pathname = usePathname();

  if (pathname === "/login") return null;

  return (
    <nav className="w-full px-4 py-2 bg-gray-50 flex items-center justify-between z-50 sticky top-0 border-b border-gray-300">
      <div className="text-xl font-bold">DevBoard</div>
      <div className="flex items-center gap-4">
        <span className="relative group">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/03/Twitter_default_profile_400x400.png"
            alt="avatar"
            width={20}
            height={20}
            className="inline-block rounded-full ml-2"
          />
        </span>
        <LogoutButton />
      </div>
    </nav>
  );
};

export default Navbar;
