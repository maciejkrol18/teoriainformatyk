"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, Save } from "lucide-react";
import type React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { changePassword } from "@/app/(default)/dashboard/actions";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const schema = z
  .object({
    currentPassword: z.string(),
    newPassword: z
      .string()
      .min(8, { message: "Hasło musi się składać z minimum 8 znaków" }),
    confirmedNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmedNewPassword, {
    message: "Hasła nie są identyczne",
    path: ["confirm"],
  });

export default function ChangePasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    resetField,
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });
  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        const error = await changePassword(data);
        if (error) {
          toast.error(`Wystąpił błąd: ${error}`);
          resetField("currentPassword");
          return;
        }
      })}
      className="w-full max-w-[500px] flex flex-col gap-4 bg-background-bright p-4 rounded-lg"
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="password">Aktualne hasło</label>
        <Input id="currentPassword" type="password" {...register("currentPassword")} />
        {errors.newPassword?.message && (
          <p className="text-red-500">
            {errors.currentPassword?.message as React.ReactNode}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="password">Nowe hasło</label>
        <Input id="newPassword" type="password" {...register("newPassword")} />
        {errors.newPassword?.message && (
          <p className="text-red-500">{errors.newPassword?.message as React.ReactNode}</p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="confirm">Potwierdź nowe hasło</label>
        <Input
          id="confirmedNewPassword"
          type="password"
          {...register("confirmedNewPassword")}
        />
        {errors.confirmedNewPassword?.message && (
          <p className="text-red-500">
            {errors.confirmedNewPassword?.message as React.ReactNode}
          </p>
        )}
      </div>
      <Button type="submit" variant="primary">
        {isSubmitting ? <Loader className="animate-spin" /> : <Save />} Zatwierdź zmiany
      </Button>
    </form>
  );
}
