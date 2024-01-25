import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
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
import { format } from "date-fns";
import { Input } from "../ui/input";
import { InputPrime } from "../Input/InputPrime";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Calendar } from "../ui/calendar";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import ButtonWithLoading from "../Button/ButtonWithLoading";
import { formatDate } from "@/utils/formatDate";
import services from "@/services/services";
import { toast } from "sonner";
import { useRouter } from "next/router";

const formSchema = z.object({
  username: z
    .string()
    .min(5, {
      message: "Username must be at least 5 characters.",
    })
    .max(25, {
      message: "Username characters maximum 25 length.",
    })
    .refine((value) => /^[a-zA-Z0-9-_]+$/.test(value), {
      message:
        "Username can only contain letters, numbers, '-' and '_',. no space and special character allowed",
    }),
  email: z.string().email({ message: "Must be a valid email" }),
  fullname: z
    .string()
    .min(2, {
      message: "Fullname must be at least 2 characters.",
    })
    .refine((value) => /^[a-zA-Z ]+$/.test(value), {
      message: "Fullname can only contain letters",
    }),
  birth_date: z.date({
    required_error: "A date of birth is required.",
  }),
  mobile_phone: z
    .string()
    .regex(/^[1-9]/, { message: "first number must be not 0" }),
  gender: z.enum(["Male", "Female"], {
    required_error: "You need to select a gender type.",
  }),
  place_of_birth: z
    .string()
    .min(1, {
      message: "Cannot be empty.",
    })
    .refine((value) => /^[a-zA-Z ]+$/.test(value), {
      message: "Place of birth can only contain letters",
    }),
  marital_status: z.string({
    required_error: "Choose marital status.",
  }),
});

const EditEmployeeDataForm = ({
  id,
  username,
  email,
  fullname,
  mobile_phone,
  place_of_birth,
  birth_date,
  marital_status,
  gender,
}: IUserData) => {
  const convertToDate = new Date(birth_date);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username,
      email,
      fullname,
      mobile_phone: mobile_phone.slice(2),
      place_of_birth,
      birth_date: convertToDate,
      marital_status,
      gender,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formattedDate = formatDate(String(values.birth_date));
    const editPayload = {
      ...values,
      id,
      mobile_phone: `62${values.mobile_phone}`,
      birth_date: formattedDate,
    };

    const { error, message } = await services.putEmployeeByAdmin(editPayload);

    if (error) {
      toast.error(message.message);
    } else {
      toast.success("Employee data updated");
      router.push("/admin");
    }
  }
  return (
    <Form {...form}>
      <form
        className="mt-5 rounded-lg border-[1px] border-border py-10 shadow"
        id="edit-employee-form"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex gap-5 px-20 pb-10">
          <div className="flex-1">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Username<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-base">
                    Email
                    <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fullname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Fullname<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="fullname" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="birth_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Date of birth<span className="text-red-500">*</span>
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        captionLayout="dropdown-buttons"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                        fromYear={1960}
                        toYear={2030}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex-1">
            <FormField
              control={form.control}
              name="mobile_phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-base">
                    Phone Number<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <InputPrime
                      icon="+62"
                      onKeyDown={(evt) =>
                        ["e", "E", "+", "-", "."].includes(evt.key) &&
                        evt.preventDefault()
                      }
                      type="number"
                      placeholder="821xxxxxx"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="place_of_birth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Place of birth<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="place of birth" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="marital_status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Marital Status<span className="text-red-500">*</span>
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Your marital status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Single">Single</SelectItem>
                      <SelectItem value="Double">Double</SelectItem>
                      <SelectItem value="Maried">Maried</SelectItem>
                      <SelectItem value="Divorce">Divorce</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Gender<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl className="pt-1">
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex items-center  "
                    >
                      <FormItem className="flex items-center space-x-1 ">
                        <FormControl>
                          <RadioGroupItem className="self-end" value="Male" />
                        </FormControl>
                        <FormLabel className="font-normal">Male</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-1 ">
                        <FormControl>
                          <RadioGroupItem className="self-end" value="Female" />
                        </FormControl>
                        <FormLabel className="font-normal">Female</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex justify-center">
          <ButtonWithLoading
            buttonContent="Edit Employee"
            loadingContent="Please kind wait..."
            type="submit"
          />
        </div>
      </form>
    </Form>
  );
};

export default EditEmployeeDataForm;
