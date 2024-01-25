import CoreLayout from "@/components/Layouts/CoreLayout";
import { GetServerSideProps } from "next";
import React, { ReactElement } from "react";

const Employee = ({ userInformation }: IemployeeInformationPage) => {
  console.log(userInformation);

  return <div>Employee</div>;
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
  console.log(userInformation);

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
