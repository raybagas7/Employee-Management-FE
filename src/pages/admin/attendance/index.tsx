import ButtonWithLoading from "@/components/Button/ButtonWithLoading";
import CoreLayout from "@/components/Layouts/CoreLayout";
import services from "@/services/services";
import Head from "next/head";
import React, { ReactElement } from "react";
import { toast } from "sonner";

const Attendance = () => {
  const attendanceCheck = async (statusCheck: string) => {
    const { error, message } =
      await services.postCheckInOrOurAttendance(statusCheck);

    if (error) {
      toast.error(message.message);
    } else {
      toast.success(`You just check ${statusCheck}`);
    }
  };
  return (
    <>
      <Head>
        <title>{`Attendance | Kazee Employee Management`}</title>
        <meta name="kazee" content="Generated by create next app" />`
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="min-w-screen min-h-screen gap-3 px-3 pb-10 pt-16 md:px-28 md:pt-24 2xl:px-72 ">
        <div className="flex gap-3">
          <ButtonWithLoading
            buttonContent="Check-in"
            loadingContent="Checking in"
            className="w-full lg:w-fit"
            onClick={() => attendanceCheck("in")}
          />
          <ButtonWithLoading
            buttonContent="Check-out"
            loadingContent="Checking in"
            className="w-full lg:w-fit"
            onClick={() => attendanceCheck("out")}
          />
        </div>
      </main>
    </>
  );
};

export default Attendance;

Attendance.getLayout = function getLayout(page: ReactElement) {
  return <CoreLayout>{page}</CoreLayout>;
};
