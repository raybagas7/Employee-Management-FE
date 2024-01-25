import React, { useEffect } from "react";
import TopNavigation from "./TopNavigation";
import MobileNavigation from "./MobileNavigation";
import { useUser } from "@/store/user/useUser";
import AdminTopNavigation from "./AdminTopNavigation";

const MainNavigation = () => {
  const { userData, getUserData } = useUser();

  useEffect(() => {
    if (!userData) {
      getUserData();
    }
  }, [userData, getUserData]);

  if (!userData) {
    return null;
  }
  return (
    <>
      {userData.is_admin ? <AdminTopNavigation /> : <TopNavigation />}
      <MobileNavigation />
    </>
  );
};

export default MainNavigation;
