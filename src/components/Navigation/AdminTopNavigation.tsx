import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { deleteCookie, getCookie } from "cookies-next";
import services from "@/services/services";
import { Badge } from "../ui/badge";

const AdminTopNavigation = () => {
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
          <Link href="/admin">
            <h1 className="text-xl font-bold max-md:text-base">
              Employee Management
            </h1>
          </Link>
          <Badge>Admin</Badge>
        </div>
        <ul className="flex items-center gap-5 max-md:hidden">
          <Link href="/admin">
            <li className="cursor-pointer font-bold transition-colors hover:text-primary">
              Home
            </li>
          </Link>
          <Link href="/admin/registration">
            <li className="cursor-pointer font-bold transition-colors hover:text-primary">
              Registration
            </li>
          </Link>
          <Link href="/admin/attendance">
            <li className="cursor-pointer font-bold transition-colors hover:text-primary">
              Attendance
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

export default AdminTopNavigation;
