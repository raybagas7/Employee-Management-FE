import React from "react";
import Link from "next/link";

const AdminTopNavigation = () => {
  return (
    <nav className="fixed top-0 z-[100] w-full border-b-[1px] bg-background/60 px-3 py-3 backdrop-blur md:px-28 2xl:px-72">
      <div className="flex w-full items-center justify-between gap-2 ">
        <div className="flex items-center gap-1">
          <Link href="/">
            <h1 className="text-xl font-bold max-md:text-base">
              Employee Management
            </h1>
          </Link>
        </div>
        <ul className="flex items-center gap-5 max-md:hidden">
          <Link href="/">
            <li className="cursor-pointer font-bold transition-colors hover:text-primary">
              Home
            </li>
          </Link>
          <Link href="/">
            <li className="cursor-pointer font-bold transition-colors hover:text-primary">
              Profile
            </li>
          </Link>
          <Link href="/">
            <li className="cursor-pointer font-bold transition-colors hover:text-primary">
              Attendance
            </li>
          </Link>
          <Link href="/">
            <li className="cursor-pointer font-bold transition-colors hover:text-primary">
              Logout
            </li>
          </Link>
        </ul>
      </div>
    </nav>
  );
};

export default AdminTopNavigation;
