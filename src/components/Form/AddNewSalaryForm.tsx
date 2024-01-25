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
import { Input } from "../ui/input";
import { InputPrime } from "../Input/InputPrime";
import ButtonWithLoading from "../Button/ButtonWithLoading";
import services from "@/services/services";
import { toast } from "sonner";
import { useModal } from "@/store/modal/useModal";
import { useRouter } from "next/router";

const formSchema = z.object({
  role: z.string().min(1, {
    message: "Required.",
  }),
  salary: z.string().regex(/^[1-9]/, { message: "first number must be not 0" }),
});

const AddNewSalaryForm = ({ id }: AddSalaryForm) => {
  const { hideModal } = useModal();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);

    const addSalaryPayload = {
      ...values,
      owner: id,
    };

    console.log(addSalaryPayload);

    const { error, message } =
      await services.postSalaryByAdmin(addSalaryPayload);

    if (error) {
      toast.error(message.message);
    } else {
      toast.success("Salary added to the employee");
      hideModal();
      router.push("/admin");
    }
  }

  return (
    <Form {...form}>
      <form
        className="m-5"
        id="employee-salary-form"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <h2 className="mb-3 text-center font-bold text-primary">
          Role & Salary Form
        </h2>
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Role<span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="role" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="salary"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-base">
                Salary<span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <InputPrime
                  icon="Rp"
                  onKeyDown={(evt) =>
                    ["e", "E", "+", "-", "."].includes(evt.key) &&
                    evt.preventDefault()
                  }
                  type="number"
                  placeholder="salary"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="mt-3 flex justify-center">
          <ButtonWithLoading
            buttonContent="Submit"
            loadingContent="Please kind wait..."
            type="submit"
          />
        </div>
      </form>
    </Form>
  );
};

export default AddNewSalaryForm;
