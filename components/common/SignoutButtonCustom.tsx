"use client";
import { Button } from "../ui/button";
import Link from "next/link";
import { useClerk } from "@clerk/nextjs";

export default function SignoutButtonCustom() {
  const { signOut } = useClerk();
  return (
    <div>
      <Button
        size={"lg"}
        variant={"link"}
        className="w-24 md:w-40 bg-linear-to-r from-zinc-800 to-zinc-600 px-4 py-1 md:px-6 md:py-3 text-xs md:text-sm font-medium text-white shadow-md transition hover:brightness-180 hover:shadow-lg hover:no-underline flex items-center justify-center "
        onClick={() => signOut({ redirectUrl: "/" })}
      >
        Sign Out
      </Button>
      <Link
        href="/#pricing"
        className="flex item-center justify-center "
      ></Link>
    </div>
  );
}
