"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";
import HeaderLined from "../Header/HeaderLined";
import { InputPrime } from "../Input/InputPrime";
import ButtonWithLoading from "../Button/ButtonWithLoading";
import { useLoading } from "@/store/loading/useLoading";
import services from "@/services/services";
import { toast } from "sonner";
import { setCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useUser } from "@/store/user/useUser";

const loginFormSchema = z.object({
  username: z
    .string()
    .min(5, {
      message: "Username must be at least 5 characters.",
    })
    .refine((value) => /^[a-zA-Z0-9-_]+$/.test(value), {
      message:
        "Username can only contain letters, numbers, '-' and '_',. no space and special character allowed",
    }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});

const LoginForm = () => {
  const [showPasswod, setShowPassword] = useState<boolean>(false);
  const { hideLoadingSm, showLoadingSm } = useLoading();
  const { setUserData } = useUser();
  const router = useRouter();
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onToggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    showLoadingSm();
    const { error, data, code, message } = await services.postLogin(values);

    console.log(error, data, code, message);

    if (error && code === 500) {
      toast.error("Something happened in the server");
      hideLoadingSm();
    }
    if (error) {
      toast.error(message.message);
      hideLoadingSm();
    }
    if (!error && code === 201) {
      // setUserData(data.data.user_data);
      toast.success("Login success");
      setCookie("refreshToken", data.data.refreshToken);
      setCookie("accessToken", data.data.accessToken);
      const {
        error: errorUser,
        data: dataUser,
        code: codeUser,
        message: messageUser,
      } = await services.getSpesificUserData();
      console.log(errorUser, dataUser, codeUser, messageUser);

      if (dataUser.data.user.is_admin) {
        setUserData(dataUser.data.user);
        router.push("/admin");
      } else {
        setUserData(dataUser.data.user);
        router.push("/");
      }

      hideLoadingSm();
    }
  }

  return (
    <div className="shadow-drop-line mt-5 w-[80vw] rounded-lg border-[1px] border-border bg-background p-5 lg:mt-0 lg:w-[30rem]">
      <div className="space-y-3 lg:space-y-5">
        <p className="text-center text-2xl font-bold text-primary">Kazee</p>
        <div className="flex flex-col justify-center gap-1 text-center text-xs lg:flex-row lg:text-base">
          <p className="hidden lg:block">{`To register admin account,`}</p>
          <Link
            href={"/register"}
            className="text-primary transition-transform hover:underline hover:transition-transform"
          >
            Register Here
          </Link>
        </div>
        <HeaderLined className="text-sm lg:text-base">Login</HeaderLined>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-base">Username</FormLabel>
                  <FormControl>
                    <Input placeholder="username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-base">Password</FormLabel>
                  <FormControl>
                    <InputPrime
                      icon={
                        showPasswod ? (
                          <FaRegEye
                            className=" cursor-pointer"
                            onClick={onToggleShowPassword}
                          />
                        ) : (
                          <FaRegEyeSlash
                            className=" cursor-pointer"
                            onClick={onToggleShowPassword}
                          />
                        )
                      }
                      iconEnd
                      type={showPasswod ? "text" : "password"}
                      placeholder="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex w-full justify-center pt-5 ">
              <ButtonWithLoading
                buttonContent="Login"
                loadingContent="Logging in"
                className="w-full lg:w-fit"
              />
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
