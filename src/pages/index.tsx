import CoreLayout from "@/components/Layouts/CoreLayout";
import { useUser } from "@/store/user/useUser";
import { ReactElement } from "react";

export default function Home() {
  const { userData } = useUser();

  return (
    <main className="min-w-screen min-h-screen gap-3 px-3 pb-10 pt-16 md:px-28 md:pt-32 2xl:px-72 ">
      Normal Home<p>{userData?.fullname}</p>
    </main>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <CoreLayout>{page}</CoreLayout>;
};
