"use client";

import { useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { DefaultAvatar, LogoutButton } from "./index";
import useClickOutside from "@/hooks/useClickOutside";
import { HomeIcon } from "@heroicons/react/24/solid";

export const Navbar = () => {
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useClickOutside(dropdownRef, () => setIsOpen(false));

  if (pathname === "/login") return null;

  return (
    <nav className="w-full px-4 py-2 bg-gray-50 flex items-center justify-between z-50 sticky top-0 border-b border-gray-300">
      <div className="flex items-center gap-2">
        <HomeIcon className="h-6 w-6 text-gray-700" />
        <span className="text-xl font-bold select-none">DevTracker</span>
      </div>
      <div className="flex items-center gap-4" ref={dropdownRef}>
        <button
          className="flex items-center relative group"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <DefaultAvatar width={20} height={20} />
        </button>
        {isOpen && (
          <div className="absolute right-0 top-10 bg-white shadow-lg rounded-lg p-4 w-48 z-50">
            <LogoutButton />
          </div>
        )}
      </div>
    </nav>
  );
};
