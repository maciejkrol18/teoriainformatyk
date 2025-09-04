"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, RotateCcw } from "lucide-react";
import type React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { resetStats } from "@/app/(default)/dashboard/actions";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const CONFIRMATION_PHRASE = "Zresetuj statystyki";

const schema = z
  .object({
    currentPassword: z.string().min(1, { message: "Hasło nie może być puste" }),
    confirmationPhrase: z.string(),
  })
  .refine((data) => data.confirmationPhrase === CONFIRMATION_PHRASE, {
    message: "Nieprawidłowa fraza potwierdzająca",
    path: ["confirmationPhrase"],
  });

export default function ResetStatsForm() {
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
        const error = await resetStats(data);
        if (error) {
          toast.error(`Wystąpił błąd: ${error.message}`);
          resetField("currentPassword");
          return;
        }
      })}
      className="w-full max-w-[500px] flex flex-col gap-4 bg-background-bright p-4 rounded-lg"
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="currentPassword">Twoje hasło</label>
        <Input id="currentPassword" type="password" {...register("currentPassword")} />
        {errors.currentPassword?.message && (
          <p className="text-red-500">
            {errors.currentPassword?.message as React.ReactNode}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="confirmationPhrase">
          Potwierdź reset (wpisz &quot;{CONFIRMATION_PHRASE}&quot;)
        </label>
        <Input id="confirmationPhrase" type="text" {...register("confirmationPhrase")} />
        {errors.confirmationPhrase?.message && (
          <p className="text-red-500">
            {errors.confirmationPhrase?.message as React.ReactNode}
          </p>
        )}
      </div>
      <Button type="submit" variant="destructive">
        {isSubmitting ? <Loader className="animate-spin" /> : <RotateCcw />} Zresetuj
        statystyki
      </Button>
    </form>
  );
}
