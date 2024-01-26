import React from "react";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ButtonWithLoading from "../Button/ButtonWithLoading";
import { Input } from "../ui/input";
import { InputPrime } from "../Input/InputPrime";
import services from "@/services/services";
import { toast } from "sonner";
import { useRouter } from "next/router";
import { useModal } from "@/store/modal/useModal";
import { useLoading } from "@/store/loading/useLoading";

const formSchema = z.object({
  role: z.string().min(1, {
    message: "Required.",
  }),
  salary: z.string().regex(/^[1-9]/, { message: "first number must be not 0" }),
});

const EditSalaryForm = ({ id, salary, role }: EditSalaryForm) => {
  const { hideModal } = useModal();
  const { showLoadingSm, hideLoadingSm } = useLoading();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role,
      salary,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    showLoadingSm();
    const editSalaryPayload = {
      ...values,
      owner: id,
    };

    const { error, message } =
      await services.putSalaryByAdmin(editSalaryPayload);

    if (error) {
      toast.error(message.message);
      hideLoadingSm();
    } else {
      toast.success("Salary and Role Updated");
      hideModal();
      hideLoadingSm();
      router.push("/admin");
    }
  }

  async function deleteSalary() {
    showLoadingSm();

    const { error, message } = await services.deleteSalaryByAdmin({
      owner: id,
    });

    if (error) {
      toast.error(message.message);
      hideLoadingSm();
    } else {
      toast.success("Salary and Role deleted for the employee");
      hideModal();
      hideLoadingSm();
      router.push("/admin");
    }
  }

  return (
    <Form {...form}>
      <form
        className="relative mt-5 rounded-lg border-[1px] border-border py-10 shadow"
        id="employee-salary-form"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex gap-5 px-20 pb-10">
          <div className="flex-1">
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
          </div>
          <div className="flex-1">
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
          </div>
        </div>

        <div className="mt-5 flex justify-center gap-5">
          <ButtonWithLoading
            buttonContent="Edit Salary & Role"
            loadingContent="Please kind wait..."
            type="submit"
          />
          <ButtonWithLoading
            className="absolute bottom-3 right-3"
            buttonContent="Delete Salary"
            loadingContent="Please kind wait..."
            onClick={deleteSalary}
            type="button"
          />
        </div>
      </form>
    </Form>
  );
};

export default EditSalaryForm;
