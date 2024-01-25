import React from "react";
import Link from "next/link";
import services from "@/services/services";
import { deleteCookie, getCookie } from "cookies-next";
import { useRouter } from "next/router";

const TopNavigation = () => {
  const router = useRouter();
  const onLogout = async () => {
    const refreshToken = getCookie("refreshToken");
    await services.deleteAccessToken({
      refreshToken: String(refreshToken),
    });
    deleteCookie("accessToken", { path: "/" });
    deleteCookie("refreshToken", { path: "/" });
    router.push("/login");
  };

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
          <button onClick={onLogout}>
            <li className="cursor-pointer font-bold transition-colors hover:text-primary">
              Logout
            </li>
          </button>
        </ul>
      </div>
    </nav>
  );
};

export default TopNavigation;
