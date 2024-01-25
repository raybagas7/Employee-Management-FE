import EditEmployeeDataForm from "@/components/Form/EditEmployeeDataForm";
import HeaderLined from "@/components/Header/HeaderLined";
import CoreLayout from "@/components/Layouts/CoreLayout";
import { GetServerSideProps } from "next";
import React, { ReactElement } from "react";

const Employee = ({ userInformation }: IemployeeInformationPage) => {
  return (
    <>
      <main className="min-w-screen min-h-screen gap-3 px-3 pb-10 pt-16 md:px-28 md:pt-32 2xl:px-72 ">
        <div>
          <HeaderLined className="text-primary">Edit Employee</HeaderLined>
          <EditEmployeeDataForm {...userInformation} />
        </div>
      </main>
    </>
  );
};

export default Employee;

Employee.getLayout = function getLayout(page: ReactElement) {
  return <CoreLayout>{page}</CoreLayout>;
};

export const getServerSideProps: GetServerSideProps = async ({
  params,
}: any) => {
  const response = await fetch(
    `${process.env.BASE_API_URL}/users/${params.id}`,
  );

  const userInformation = await response.json();

  if (!params || !params.id || response.status !== 200) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      userInformation: userInformation.data.user,
    },
  };
};
