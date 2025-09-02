"use client";

import { LayoutDashboard, LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { signOut } from "@/app/(auth)/actions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";

interface HeaderAuthDropdownProps {
  display_name: string;
  avatar_url: string;
}

export default function HeaderAuthDropdown({
  display_name,
  avatar_url,
}: HeaderAuthDropdownProps) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button type="button" onClick={() => setOpen(true)}>
          {avatar_url ? (
            <Image
              src={avatar_url}
              alt="Profil"
              width={32}
              height={32}
              className="rounded-full"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-gray-300" />
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          <p className="text-muted">Zalogowano jako</p>
          {display_name}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link
            href="/dashboard"
            className="flex gap-2 w-full"
            onClick={() => setOpen(false)}
          >
            <LayoutDashboard /> Panel
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <button
            type="button"
            className="flex gap-2 w-full"
            onClick={() => {
              setOpen(false);
              signOut();
            }}
          >
            <LogOut /> Wyloguj
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
