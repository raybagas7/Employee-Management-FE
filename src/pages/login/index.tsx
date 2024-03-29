import LoginForm from "@/components/Form/LoginForm";
import Head from "next/head";
import React from "react";
import { Toaster } from "sonner";

const Login = () => {
  return (
    <>
      <Head>
        <title>Login | Kazee Employee Management</title>
        <meta name="Kazee" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-w-screen flex min-h-screen items-center justify-center">
        <div className="flex flex-col gap-1 px-5 lg:flex-row lg:gap-32">
          {/* <div className="flex items-center justify-center gap-1 lg:flex-col">
            <h1 className="text-4xl font-bold text-primary lg:text-7xl">
              Login
            </h1>
          </div> */}
          <LoginForm />
        </div>
      </main>
      <Toaster richColors closeButton />
    </>
  );
};

export default Login;
