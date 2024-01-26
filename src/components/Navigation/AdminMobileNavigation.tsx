import React from "react";
import { IoMdLogOut, IoIosHome } from "react-icons/io";
import Link from "next/link";
import { deleteCookie, getCookie } from "cookies-next";
import { useRouter } from "next/router";
import services from "@/services/services";
import { MdAppRegistration } from "react-icons/md";
import { FaClipboardList } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";

const AdminMobileNavigation = () => {
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
    <div className="fixed bottom-0 z-50 w-full rounded-t-xl border-t bg-background py-1.5 shadow md:hidden">
      <ul className="flex w-full items-center justify-evenly gap-5 ">
        <Link href={"/admin/attendance"}>
          <li className="flex cursor-pointer flex-col items-center text-xs transition-colors hover:text-primary">
            <FaClipboardList className="h-5 w-5" />
            <p>Attendance</p>
          </li>
        </Link>
        <Link href={"/admin"}>
          <li className="flex cursor-pointer flex-col items-center text-xs transition-colors hover:text-primary">
            <IoIosHome className="h-5 w-5" />
            <p>Home</p>
          </li>
        </Link>
        <Link href={"/admin/registration"}>
          <li className="flex cursor-pointer flex-col items-center text-xs transition-colors hover:text-primary">
            <MdAppRegistration className="h-5 w-5" />
            <p>Registration</p>
          </li>
        </Link>
        <Link href={"/"}>
          <li className="flex cursor-pointer flex-col items-center text-xs transition-colors hover:text-primary">
            <FaUserAlt className="h-5 w-5" />
            <p>Profile</p>
          </li>
        </Link>
        <button onClick={onLogout}>
          <li className="flex cursor-pointer flex-col items-center text-xs transition-colors hover:text-primary">
            <IoMdLogOut className="h-5 w-5" />
            <p>Logout</p>
          </li>
        </button>
      </ul>
    </div>
  );
};

export default AdminMobileNavigation;
