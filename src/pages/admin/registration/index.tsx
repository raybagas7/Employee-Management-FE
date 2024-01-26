import EmployeeRegistrationForm from "@/components/Form/EmployeeRegistrationForm";
import HeaderLined from "@/components/Header/HeaderLined";
import CoreLayout from "@/components/Layouts/CoreLayout";
import React, { ReactElement } from "react";

const Registration = () => {
  return (
    <main className="min-w-screen min-h-screen gap-3 px-3 pb-10 pt-16 md:px-28 md:pt-24 2xl:px-72 ">
      <div>
        <HeaderLined className="text-primary">
          Employee Registration
        </HeaderLined>
        <EmployeeRegistrationForm />
      </div>
    </main>
  );
};

export default Registration;

Registration.getLayout = function getLayout(page: ReactElement) {
  return <CoreLayout>{page}</CoreLayout>;
};
