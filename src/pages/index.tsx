import CoreLayout from "@/components/Layouts/CoreLayout";
import { ReactElement } from "react";

export default function Home() {
  return <main className="min-h-[100dvh] px-3 pt-20 md:px-28"></main>;
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <CoreLayout>{page}</CoreLayout>;
};
