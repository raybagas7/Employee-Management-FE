import React from "react";
import { FaUserAlt } from "react-icons/fa";
import { IoMdLogOut, IoIosHome } from "react-icons/io";
import Link from "next/link";

const MobileNavigation = () => {
  return (
    <div className="fixed bottom-0 z-50 w-full rounded-t-xl border-t bg-background py-1.5 shadow md:hidden">
      <ul className="flex w-full items-center justify-evenly gap-5 ">
        <Link href={"/"}>
          <li className="flex cursor-pointer flex-col items-center text-xs transition-colors hover:text-primary">
            <FaUserAlt className="h-5 w-5" />
            <p>Profile</p>
          </li>
        </Link>
        <Link href={"/"}>
          <li className="flex cursor-pointer flex-col items-center text-xs transition-colors hover:text-primary">
            <IoIosHome className="h-5 w-5" />
            <p>Home</p>
          </li>
        </Link>
        <Link href={"/"}>
          <li className="flex cursor-pointer flex-col items-center text-xs transition-colors hover:text-primary">
            <IoMdLogOut className="h-5 w-5" />
            <p>Logout</p>
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default MobileNavigation;
