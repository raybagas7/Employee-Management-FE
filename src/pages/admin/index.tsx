import { useUser } from "@/store/user/useUser";
import React, { useEffect } from "react";

const AdminHome = () => {
  const { userData, getUserData } = useUser();

  useEffect(() => {
    if (!userData) {
      getUserData();
    }
  }, [userData, getUserData]);

  return (
    <div>
      AdminHome<p>{userData?.fullname}</p>
    </div>
  );
};

export default AdminHome;
