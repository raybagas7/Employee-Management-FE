import AdminRegistrationForm from "@/components/Form/AdminRegistrationForm";
import HeaderLined from "@/components/Header/HeaderLined";
import React from "react";
import { Toaster } from "sonner";

const Register = () => {
  return (
    <>
      <main className="min-w-screen min-h-screen gap-3 px-3 pb-10 pt-16 md:px-28 md:pt-24 2xl:px-72 ">
        <HeaderLined className="text-primary">
          Register Admin Account
        </HeaderLined>
        <AdminRegistrationForm />
      </main>
      <Toaster richColors closeButton />
    </>
  );
};

export default Register;
