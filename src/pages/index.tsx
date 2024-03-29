import LabeledContainer from "@/components/Container/LabeledContainer";
import CoreLayout from "@/components/Layouts/CoreLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@/store/user/useUser";
import { formatDate } from "@/utils/formatDate";
import { formatIDR } from "@/utils/formatIDR";
import Head from "next/head";
import { ReactElement } from "react";

export default function Home() {
  const { userData } = useUser();

  if (!userData) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Home | Kazee Employee Management</title>
        <meta name="Kazee" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-[100dvh] px-3 pt-20 md:px-28">
        <h1 className="text-center text-2xl font-bold">Your Information</h1>
        <div className="mt-5">
          <div className="flex flex-col items-center gap-5">
            <Avatar className="h-64 w-64 rounded-lg border-[1px] border-border max-md:h-40 max-md:w-40">
              <AvatarImage
                className=" object-cover"
                src={userData?.profile_img}
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <LabeledContainer
              label="User Information"
              className="flex gap-5 max-md:flex-col max-md:justify-center max-md:text-sm"
            >
              <div className="flex gap-3">
                <div className="flex flex-col justify-between font-bold">
                  <p>Username</p>
                  <p>Full Name</p>
                  <p>Email</p>
                  <p>Phone Number</p>
                  <p>Birthday</p>
                </div>
                <div className="flex flex-col justify-between">
                  <p>{userData.username}</p>
                  <p>{userData.fullname}</p>
                  <p>{userData.email}</p>
                  <p>+{userData.mobile_phone}</p>
                  <p>{formatDate(userData.birth_date)}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex flex-col justify-between font-bold">
                  <p>Gender</p>
                  <p>Marital Status</p>
                  <p>Salary</p>
                  <p>Role</p>
                  <p>Place of Birth</p>
                </div>
                <div className="flex flex-col justify-between">
                  <p>{userData.gender}</p>
                  <p>{userData.marital_status}</p>
                  <p>
                    {userData.salary ? (
                      formatIDR(userData.salary)
                    ) : (
                      <span className="font-bold text-destructive">
                        No Salary
                      </span>
                    )}
                  </p>
                  <p>
                    {userData.role ? (
                      userData.role
                    ) : (
                      <span className="font-bold text-destructive">
                        No role
                      </span>
                    )}
                  </p>
                  <p>{userData.place_of_birth}</p>
                </div>
              </div>
            </LabeledContainer>
          </div>
        </div>
      </main>
    </>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <CoreLayout>{page}</CoreLayout>;
};
