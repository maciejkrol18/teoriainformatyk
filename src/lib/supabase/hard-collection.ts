"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "./server";

export default async function updateHardCollection(
  id: number,
  action: "add" | "remove"
): Promise<{
  success: boolean;
  message: string;
}> {
  const supabase = await createClient();
  if (action === "remove") {
    const { error } = await supabase.rpc("remove_from_hard_collection", {
      idtoremove: id,
    });
    !error && revalidatePath(`/question/${id}`);
    return {
      // biome-ignore lint/complexity/noExtraBooleanCast: this doesn't get coerced
      success: !Boolean(error),
      message: error?.message || `Usunięto ID ${id} ze zbioru`,
    };
  }
  const { error } = await supabase.rpc("add_to_hard_collection", {
    newid: id,
  });
  !error && revalidatePath(`/question/${id}`);
  return {
    // biome-ignore lint/complexity/noExtraBooleanCast: this doesn't get coerced
    success: !Boolean(error),
    message: error?.message || `Dodano ID ${id} ze zbioru`,
  };
}
