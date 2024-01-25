import EmployeeCard from "@/components/Card/EmployeeCard";
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

  if (!employeeList) {
    return null;
  }

  return (
    <main className="min-w-screen min-h-screen gap-3 px-3 pb-10 pt-16 md:px-28 md:pt-32 2xl:px-72 ">
      AdminHome<p>{userData?.fullname}</p>
      <div className="grid-cols-employee-card max-md:grid-cols-mobile-employee-card mt-5 grid  gap-3 ">
        {employeeList.map((employee) => (
          <EmployeeCard key={employee.id} {...employee} />
        ))}
      </div>
    </main>
  );
};

export default AdminHome;

AdminHome.getLayout = function getLayout(page: ReactElement) {
  return <CoreLayout>{page}</CoreLayout>;
};
