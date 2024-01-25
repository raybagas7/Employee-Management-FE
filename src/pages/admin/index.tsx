import CoreLayout from "@/components/Layouts/CoreLayout";
import { useUser } from "@/store/user/useUser";
import React, { ReactElement, useEffect } from "react";

const AdminHome = () => {
  const { userData, getEmployeeList, employeeList } = useUser();

  useEffect(() => {
    if (!employeeList) {
      getEmployeeList();
    }
  }, [employeeList, getEmployeeList]);

  console.log(employeeList);

  return (
    <main className="min-w-screen min-h-screen gap-3 px-3 pb-10 pt-16 md:px-28 md:pt-32 2xl:px-72 ">
      AdminHome<p>{userData?.fullname}</p>
    </main>
  );
};

export default AdminHome;

AdminHome.getLayout = function getLayout(page: ReactElement) {
  return <CoreLayout>{page}</CoreLayout>;
};
