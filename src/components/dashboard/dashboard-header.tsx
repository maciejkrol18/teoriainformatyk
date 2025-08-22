import Image from "next/image";
import { createClient } from "@/lib/supabase/server";

interface DashboardHeaderProps {
  userId: string;
}

export default async function DashboardHeader({ userId }: DashboardHeaderProps) {
  const supabase = await createClient();

  const { data } = await supabase
    .from("profiles")
    .select("avatar_url, created_at, display_name")
    .eq("user_id", userId)
    .single();

  const dateJoined = data?.created_at
    ? new Date(data.created_at).toLocaleDateString()
    : "Nieznana data dołączenia";

  return (
    <div className="flex flex-col lg:flex-row text-center lg:text-left gap-6 items-center">
      {data?.avatar_url ? (
        <Image
          src={data?.avatar_url}
          alt="Zdjęcie profilowe"
          className="rounded-full"
          width={50}
          height={50}
        />
      ) : (
        <div className="w-12 h-12 rounded-full bg-gray-300" />
      )}
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold">{data?.display_name || "Użytkownik"}</h1>
        <p className="text-lg text-muted">Użytkownik od {dateJoined}</p>
      </div>
    </div>
  );
}
